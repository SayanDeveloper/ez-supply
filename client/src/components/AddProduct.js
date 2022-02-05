import React, {useState, useEFfect, useEffect, useContext} from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import ToastAlert from './ToastAlert';
import '../styles/LoginRegister.css';
import '../styles/main.css';
import { GlobalContext } from '../context/provider';

function AddProduct() {
  // states
  const [prodName, setProdName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState();

  // context
  const {toast} = useContext(GlobalContext);
  const [toastAppear, setToastAppear] = toast;

  // functions
  useEffect(() => {
    const d = new Date();
    setDate(d.toISOString().substr(0, 10));
    console.log(typeof date);
  }, []);

  const addProductSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setToastAppear(true);
  }

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <>
      <TopNav />
      <SideNav />
      <div className='main-content-container add-prod-page'>
        {
          toastAppear ?
          <ToastAlert message={"The product has been added"} />
          : ""
        }
        <h2>Add Product</h2>
        <form className='add-prod-inputs login-form' onSubmit={(e) => addProductSubmit(e)}>
          <div>
              <input 
                  type="text"
                  // value={email}
                  // onChange={(e) => setemail(e.target.value)}
                  placeholder='Enter product name'
                  required={true}
              />
              <label htmlFor="">Product Name</label>
          </div>
          <div>
              <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required={true}
                  min="1"
                  max="30"
              />
              <label htmlFor="">Quantity</label>
          </div>
          <div>
              <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2000-01-01" max="2022-12-31"
                  required={true}
              />
              <label htmlFor="">Manufacturing date (mm/dd/yyyy)</label>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
