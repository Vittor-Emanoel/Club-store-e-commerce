import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FunctionComponent, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import CategoryDetailsPage from './pages/category-details/category-details.page'
import CheckoutPage from './pages/checkout/checkout.page'
import ExplorePage from './pages/explore/explore.page'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

// Components
import CartComponent from './components/cart/cart.component'
import Loading from './components/loading/loading.component'
import AuthenticationGuard from './guards/authentication.guard'

// Ultilities

import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore.converter'

const App: FunctionComponent = () => {
  const [isInitialized, setIsInitialized] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  console.log({ isAuthenticated })
  // monitora se o usuario está logado ou não
  onAuthStateChanged(auth, async (user) => {
    // se o usuario estiver logado no contexto, e o usuario no firebase(sign out)
    // devemos limpar o context (sign out)

    const isSignIngOut = isAuthenticated && !user

    if (isSignIngOut) {
      logoutUser()

      return setIsInitialized(false)
    }

    // o usuario for nulo no contexto, e não for nulo no firebase
    // devemos fazeer o login

    const isSignIngIn = !isAuthenticated && user
    if (isSignIngIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users').withConverter(userConverter), where('id', '==', user.uid))
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()

      loginUser(userFromFirestore)

      return setIsInitialized(false)
    }
    return setIsInitialized(false)
  })

  // aplicação só vai ser exibida quando terminar o processamento
  if (isInitialized) return <Loading />
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/explore' element={<ExplorePage />}/>
        <Route path='/category/:id' element={<CategoryDetailsPage />}/>
        <Route
        path='/checkout'
        element={
        <AuthenticationGuard>
          <CheckoutPage />
          </AuthenticationGuard>
          }
          />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/sign-up' element={<SignUpPage />}/>
      </Routes>

      <CartComponent />
    </BrowserRouter>
  )
}
export default App
