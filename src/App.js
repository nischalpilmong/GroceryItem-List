import React, {useState, useEffect} from 'react'
import Alert from './Alert';
import List from './List'



const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'));
  }else{
    return [];
  }
}
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [editID, setEditID] = useState(null);
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
        setList(list.map((item) => {
          if(item.id === editID){
            return {...item, title: name}
          }
          return item;
        }))
        setName('');
        setEditID(null);
        setIsEditing(false);
        showAlert(true, 'success', 'Item value edited');
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
  
  const clearItems = () => {
      showAlert(true, 'danger', 'Empty items');
      setList([]);
  };
  
  const removeItem = (id) => {
    if(list.length > 0){
      showAlert(true, 'danger', 'Item removed');
      setList(list.filter(item => item.id !== id));      
    } else {
      showAlert(true, 'danger', 'Empty items');
    }   
  }

  const editItem = (id) => {
       const specificItem = list.find(item => item.id === id);
       setIsEditing(true);
       setEditID(id);
       setName(specificItem.title);
  };
   //Setting local storage
    useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list));
     }, [list]);

  return (
    <section className="section-center">
       <form className="grocery-form" onSubmit={handleSubmit}>
         {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
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
              <List items={list} removeItem={removeItem} editItem={editItem}/>
              <button className="clear-btn" onClick={clearItems}>Clear items</button>
            </div>
       )}
    </section>
  );
}

export default App;
