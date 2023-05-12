import { FunctionComponent, useContext, useEffect } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { BsFillEmojiFrownFill } from 'react-icons/bs'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.components'

// Styles
import { CartContext } from '../../contexts/cart.context'
import Colors from '../../theme/theme.color'
import { PaymentConfirmationContainer, PaymentConfirmationContent } from './payment-confirmation.styles'

const PaymentConfirmationPage: FunctionComponent = () => {
  const { clearProducts } = useContext(CartContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const status = searchParams.get('success')
  const statusCanceled = searchParams.get('canceled')

  const handleToHomeBack = () => {
    navigate('/')
  }

  useEffect(() => {
    if (status === 'true') {
      clearProducts()
    }
  }, [status])

  return (
   <>
  <Header />

    <PaymentConfirmationContainer>
    <PaymentConfirmationContent>
      {status === 'true' && (
        <>
        <AiOutlineCheckCircle size={120} color={Colors.success}/>
        <p>Sua compra foi finalizada com sucesso!</p>
        </>

      )}
      {status === 'false' && (
        <>
        <AiOutlineCloseCircle size={120} color={Colors.error}/>
          <p>Ocorreu um erro ao finalizar sua compra. Por favor, tente novamente.</p>
          </>

      )}

      {statusCanceled === 'true' && (
        <>
        <BsFillEmojiFrownFill size={120} color={Colors.error}/>
        <p>Por que desistiu da sua compra?</p>
        </>
      )}

      <CustomButton startIcon={<AiOutlineHome />} onClick={handleToHomeBack}>Ir para a página inicial</CustomButton>
    </PaymentConfirmationContent>
    </PaymentConfirmationContainer>

  </>

  )
}

export default PaymentConfirmationPage
