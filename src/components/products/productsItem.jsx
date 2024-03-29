import React, { useState } from "react"
import { ReactComponent as ProductDefault } from "../icons/product-default.svg"
import { ReactComponent as Plus } from "../icons/plus.svg"
import { ReactComponent as Minus } from "../icons/minus.svg"
import { ReactComponent as Heart } from "../icons/heart.svg"
import { ReactComponent as ActiveHeart } from "../icons/activeHeart.svg"
import { UseBasket } from "../../context/BasketContext"
import { Route, Routes, useNavigate } from "react-router-dom"
import DetailOfProduct from "../../pages/DetailOfProduct"
import { useSelector, useDispatch } from "react-redux"

const ProductsItem = ({ product }) => {
    const navigate = useNavigate()
    const { addToBasket } = UseBasket()

    //
    // const products = useSelector((state) => state.products.data)

    // const setFun = (product) => {
    //     product.productSet = true
    // }

    const liked = useSelector((state) => state.products.liked)
    const dispatch = useDispatch()

    //

    const AddToBasket = (e) => {
        e.stopPropagation()
        if (product.quantity <= 1) {
            addToBasket(product)
        } else {
            product.quantity++
        }
    }

    const RemoveFromBasket = (e) => {
        e.stopPropagation()
        if (product.quantity > 1) {
            product.quantity--
        }
    }

    const navigateToDetail = () => {
        navigate(`/product`)
    }

    return (
        <>
            <Routes>
                <Route
                    path={`/product`}
                    element={<DetailOfProduct product={product} />}
                />
            </Routes>
            <div
                className="products-item"
                onClick={() => {
                    navigateToDetail()
                }}
            >
                <div className="products-item_imgdiv">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch.products.setLiked(product._id)
                        }}
                        className="heart"
                    >
                        {liked[product._id] ? <ActiveHeart /> : <Heart />}
                    </div>
                    {product.image !== null ? (
                        <img
                            src={product.image}
                            alt={product.name}
                        />
                    ) : (
                        <ProductDefault />
                    )}
                </div>
                <h3>{product.name}</h3>
                <h2>
                    <span className={product.promoPrice > 0 ? "redPrice" : ""}>
                        {product.price} с
                    </span>
                    <span className="discountPrice">
                        {product.promoPrice > 0 ? product.promoPrice + "c" : ""}
                    </span>
                </h2>
                <h4>В наличии</h4>
                <h5>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="7"
                        height="8"
                        viewBox="0 0 7 8"
                        fill="none"
                    >
                        <circle
                            cx="3.5"
                            cy="4"
                            r="3.5"
                            fill={
                                product.productSet !== null
                                    ? "#82CF6F"
                                    : "#949494"
                            }
                        />
                    </svg>
                    <div>В комплекте</div>
                </h5>
                <div className="products-item_bottom">
                    <div className="mathDiv">
                        <Minus onClick={(e) => RemoveFromBasket(e)} />
                    </div>
                    <div className="quantity">{product.quantity}</div>
                    <div
                        className="mathDiv"
                        onClick={(e) => AddToBasket(e)}
                    >
                        <Plus />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsItem
