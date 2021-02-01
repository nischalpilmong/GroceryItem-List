import React, {useState} from 'react'
import Alert from './Alert';
import List from './List'


function App() {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Hello');
  };
  return (
    <section className="section-center">
       <form className="grocery-form" onSubmit={handleSubmit}>
         {alert.show && <Alert />}
         <h3>Grocery Item</h3>
         <div className="form-control">
           <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e) => setName(e.target.value)}/>
           <button type="submit" className="submit-btn">
             {isEditing ? 'edit' : 'submit'}
           </button>
         </div>
       </form>
       <div className="grocery-container">
         <List />
         <button className="clear-btn">Clear items</button>
       </div>
    </section>
  );
}

export default App;
