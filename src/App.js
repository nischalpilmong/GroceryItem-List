import React, {useState} from 'react'
import Alert from './Alert';
import List from './List'


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Hello');
      if(!name){
        //display alert

        showAlert(true, 'danger', 'please enter value');
      } else if (name && isEditing) {
        //deal with edit 

      } else {
        //show alert
        showAlert(true, 'success', 'Item added to the List');
        const newItem = {id: new Date().getTime().toString(), title: name};
        setList([...list, newItem]); 
        setName('');
      }
  };

  const showAlert = (show = false, type = "", msg = "") => {
      setAlert({ show, type, msg });
  };

  return (
    <section className="section-center">
       <form className="grocery-form" onSubmit={handleSubmit}>
         {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
         <h3>Grocery Item</h3>
         <div className="form-control">
           <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)}/>
           <button type="submit" className="submit-btn">
             {isEditing ? 'edit' : 'submit'}
           </button>
         </div>
       </form>
       {list.length > 0 && (
            <div className="grocery-container">
              <List items={list}/>
              <button className="clear-btn">Clear items</button>
            </div>
       )}
    </section>
  );
}

export default App;
