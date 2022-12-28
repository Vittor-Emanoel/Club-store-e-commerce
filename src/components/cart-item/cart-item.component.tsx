import { FunctionComponent, useContext } from 'react'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { CartContext } from '../../contexts/cart.context'

// Ultilites
import CartProduct from '../../types/cart.types'

// Styles
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart-item.styles'

interface CartItemProps {
  // tem a quantity number
  product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const { removeProductFromCart, increaseProductQuantity } = useContext(CartContext)

  // remover o item pelo id
  const handleRemoveClick = () => {
    removeProductFromCart(product.id)
  }

  // Aumentando a quantidade do item
  const handleIncreaseClick = () => {
    increaseProductQuantity(product.id)
  }

  return (
    <CartItemContainer>
        <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20}/>
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseClick}/>
        </CartItemQuantity>
      </CartItemInfo>
      <RemoveButton onClick={handleRemoveClick}>
        <AiOutlineClose size={25} />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
