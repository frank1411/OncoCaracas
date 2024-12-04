import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User } from '../types';
import { useAuthStore } from '../store/authStore';
import { showToast } from '../utils/toast';

export const createUser = async (email: string, password: string, name: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = {
      id: userCredential.user.uid,
      email,
      name,
      role: 'user',
      subscription: 'free'
    };

    await setDoc(doc(db, 'users', user.id), user);
    return user;
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    showToast(errorMessage, 'error');
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }
    
    return userDoc.data() as User;
  } catch (error: any) {
    const errorMessage = getAuthErrorMessage(error.code);
    showToast(errorMessage, 'error');
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    useAuthStore.getState().setUser(null);
  } catch (error: any) {
    showToast('Error al cerrar sesión', 'error');
    throw error;
  }
};

export const initializeAuth = (): void => {
  const { setUser, setLoading } = useAuthStore.getState();

  onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    try {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error al inicializar auth:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  });
};

function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'El correo electrónico ya está registrado',
    'auth/invalid-email': 'El correo electrónico no es válido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/user-disabled': 'La cuenta ha sido deshabilitada',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Por favor, intente más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifique su conexión a internet'
  };

  return errorMessages[errorCode] || 'Error de autenticación';
}