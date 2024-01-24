const inputQuantity = document.querySelector(".input-quantity")
const quantityAdd = document.querySelector(".quantity-add") 
const quantitySubtract = document.querySelector(".quantity-subtract")
const buttonMenu = document.querySelector(".button-menu")
const buttonMenuClose = document.querySelector(".button-menu-close")
const lateralMenu = document.querySelector(".lateral-menu")
const iconCart = document.querySelector(".icon-cart")
const iconCartSpan = document.querySelector(".icon-cart-span")
const imageProduct = document.querySelector(".image-product")
const imagesProductThumbnail = document.querySelectorAll(".image-product-thumbnail")
const basketCard = document.querySelector(".basket-wrapper")
const basketEmpty = document.querySelectorAll(".basket-empty")
const buttonCart = document.querySelector(".button-cart")
const iconsDelete = document.querySelectorAll(".icon-delete")
const quantityProduct = document.querySelectorAll(".quantity-product")
const totalPriceProduct = document.querySelectorAll(".total-price-product")
const price = document.querySelector(".price")
const lightboxWrapper = document.querySelector(".lightbox-wrapper")
const buttonLightboxClose = document.querySelector(".button-lightbox-close-wrapper")
const buttonsImageWrapper = document.querySelectorAll(".button-image-wrapper")
const lightboxImageProduct = document.querySelector(".lightbox-image-product")

const productWrapper = document.querySelector(".product-wrapper")

const imagesList = ["./assets/images/image-product-1.jpg", 
                "./assets/images/image-product-2.jpg",
                "./assets/images/image-product-3.jpg",
                "./assets/images/image-product-4.jpg"]

var imageId = 0

buttonsImageWrapper.forEach((button) => {
    
    button.addEventListener("click", () => {

        let imagePath = lightboxWrapper.classList.contains("hide") ? imageProduct : lightboxImageProduct

        button.classList.contains("button-image-previous") ? imageId-- : imageId++

        if (imageId < 0) {
            imageId = 3
        } else if (imageId > 3) {
            imageId = 0
        }

        imagePath.src = imagesList[imageId]
        lightboxImageProduct.id = imageId + 1
        changeThumbnailSelected(imagePath)

    })

})

buttonMenu.addEventListener("click", () => {
    lateralMenu.classList.toggle("hide")
})

buttonMenuClose.addEventListener("click", () => {
    lateralMenu.classList.toggle("hide")
})

quantityAdd.addEventListener("click", (event) => {
    event.preventDefault()

    const inputPlaceholder = +inputQuantity.placeholder
    inputQuantity.placeholder = inputPlaceholder + 1
})

quantitySubtract.addEventListener("click", (event) => {
    event.preventDefault()

    const inputPlaceholder = +inputQuantity.placeholder
    if (inputPlaceholder > 0) inputQuantity.placeholder = inputPlaceholder - 1

})

iconCart.addEventListener("click", () => {

    window.innerWidth >= 790 ? iconCart.nextElementSibling.nextElementSibling.classList.toggle("hide") : basketCard.classList.toggle("hide")
 
})

buttonCart.addEventListener("click", (event) => {
    event.preventDefault()

    iconCartSpan.innerHTML = +inputQuantity.placeholder

    quantityProduct.forEach((element) => {
        element.innerHTML = +inputQuantity.placeholder

    })

    totalPriceProduct.forEach((element) => {
        element.innerHTML = `$${+inputQuantity.placeholder * 125}.00`
    })

    if (+inputQuantity.placeholder > 0) {

        iconCartSpan.classList.remove("hide")

        basketEmpty.forEach(element => {
            element.classList.add("hide")
        });

        iconsDelete.forEach((iconDelete) => {
            iconDelete.classList.remove("hide")
        })
        

    } else if (+inputQuantity.placeholder == 0) {

        iconCartSpan.classList.add("hide")

        basketEmpty.forEach(element => {
            element.classList.remove("hide")
        });

    }
})

iconsDelete.forEach((iconDelete) => {

    iconDelete.addEventListener("click", () => {

        basketEmpty.forEach(element => {
            element.classList.remove("hide")
        });
    
        iconDelete.classList.add("hide")

        iconCartSpan.classList.add("hide")
    
    })
    
})

imagesProductThumbnail.forEach((imageThumb) => {

    imageThumb.addEventListener("click", () => {

            let imagePath = lightboxWrapper.classList.contains("hide") ? imageProduct : lightboxImageProduct

            imagesProductThumbnail.forEach((imageThumb) => {

                if (imageThumb.parentElement.parentElement.parentElement == lightboxWrapper) {

                    imageThumb.parentElement.classList.remove("image-product-thumbnail-wrapper-selected")
                    imageThumb.classList.remove("image-product-thumbnail-selected")

                } else if (imagePath !== lightboxImageProduct) {

                    imageThumb.parentElement.classList.remove("image-product-thumbnail-wrapper-selected")
                    imageThumb.classList.remove("image-product-thumbnail-selected")

                }
              
            })
            
            imageThumb.parentElement.classList.add("image-product-thumbnail-wrapper-selected")
            imageThumb.classList.add("image-product-thumbnail-selected")

            imagePath.src = `./assets/images/image-product-${+imageThumb.id}.jpg`
    })

})

imageProduct.addEventListener("click", () => {

    if (window.innerWidth >= 790) (

        lightboxWrapper.classList.remove("hide")

    )

    var imageThumbSelected = ""
    lightboxImageProduct.src = imageProduct.src

    imagesProductThumbnail.forEach((imageThumb) => {

        if (imageThumb.parentElement.parentElement.parentElement == lightboxWrapper) {

            imageThumb.parentElement.classList.remove("image-product-thumbnail-wrapper-selected")
            imageThumb.classList.remove("image-product-thumbnail-selected")

        }

        if (imageThumb.classList.contains("image-product-thumbnail-selected")) {

            imageThumbSelected = imageThumb
            lightboxImageProduct.id = imageThumb.id

        }

        if (imageThumb.id == imageThumbSelected.id && imageThumb.parentElement.parentElement.parentElement == lightboxWrapper) {

            imageThumb.parentElement.classList.add("image-product-thumbnail-wrapper-selected")
            imageThumb.classList.add("image-product-thumbnail-selected")
                
        }

    })

    imageId = +lightboxImageProduct.id > 0 ? +lightboxImageProduct.id - 1 : 0
    
})

buttonLightboxClose.addEventListener("click", () => {
    lightboxWrapper.classList.add("hide")
})

const changeThumbnailSelected = (imagePath) => {
    
    imagesProductThumbnail.forEach((imageThumb) => {

        if (imageThumb.parentElement.parentElement.parentElement == lightboxWrapper) {

            imageThumb.parentElement.classList.remove("image-product-thumbnail-wrapper-selected")
            imageThumb.classList.remove("image-product-thumbnail-selected")

        }

        if (imagePath.id == imageThumb.id) {

            if (imagePath == lightboxImageProduct && imageThumb.parentElement.parentElement.parentElement == lightboxWrapper) {

                imageThumb.parentElement.classList.add("image-product-thumbnail-wrapper-selected")
                imageThumb.classList.add("image-product-thumbnail-selected")

            } else if (imagePath == imageProduct && imageThumb.parentElement.parentElement.parentElement == productWrapper) {
                
                imageThumb.parentElement.classList.add("image-product-thumbnail-wrapper-selected")
                imageThumb.classList.add("image-product-thumbnail-selected")

            }
        }

    })

}
