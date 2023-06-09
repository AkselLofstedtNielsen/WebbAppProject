
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom"
import '.././shoppingcart.css'

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const db = getFirestore();
  

  useEffect(() => {
    const fetchShoppingCart = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const rentedMoviesRef = collection(userRef, "shoppingCart");
        const snapshot = await getDocs(rentedMoviesRef);
        const cartItems = snapshot.docs.map((doc) => doc.data());
        setShoppingCart(cartItems);
        let totalPrice = 0;
        cartItems.forEach(movie => {
          totalPrice += movie.price;
        });
    
        setTotalPrice(totalPrice);
      }
    };

    fetchShoppingCart();
  }, [db]);

  const removeMovie = async (movieTitle) => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const rentedMoviesRef = collection(userRef, "shoppingCart");
        const querySnapshot = await getDocs(rentedMoviesRef);

        querySnapshot.forEach((doc) => {
          const movieData = doc.data();
          if (movieData.title === movieTitle) {
            deleteDoc(doc.ref);
            console.log("Movie deleted!");
          }
        });

        const updatedSnapshot = await getDocs(rentedMoviesRef);
        const updatedCartItems = updatedSnapshot.docs.map((doc) => doc.data());
        setShoppingCart(updatedCartItems);
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };




  const randomKey = () => {
    return Math.random().toString(36).substring(2, 9);
}

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="cart-info">
      {shoppingCart.length === 0 ? (
        <p>Your cart is empty. <br/>
          <button>
            <Link to="/">Rent more movies</Link>
          </button>
        </p>
        
      ) : (
        <div>
          <h3>Your added movies</h3>
          <ul> 
            {shoppingCart.map((movie) => (
              <li key={randomKey()}> 
                {movie.title} - ${movie.price}
                <button onClick={() => removeMovie(movie.title)}>-</button>
              </li>
            ))}
          </ul>

          <button>
          <Link to="/">Rent more movies</Link>
          </button>
          
          <p>Total price: ${totalPrice} </p>
          <Link to="/Payment" state={{total : totalPrice}}>
          <button>Go to checkout</button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default ShoppingCart;
