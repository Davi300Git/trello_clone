import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const inicialItems = [
  { id:"1", content:"Contéudo 1" },
  { id:"2", content:"Contéudo 2" },
  { id:"3", content:"Contéudo 3" },
  { id:"4", content:"Contéudo 4" },
  { id:"5", content:"Contéudo 5" },
  { id:"6", content:"Contéudo 6" },
  { id:"7", content:"Contéudo 7" },

];

const inicialColumns = [
  {
    name:"To do", 
    id:"123",
    items:inicialItems,
  },
  {
    name:"Doing", 
    id:"456",
    items:[],
  },
];

function App() {
  const [ columns, setColumns ] = useState(inicialColumns);

  const onDragEnd = (result) => {
    var sourceColumnItems = columns[0].items;
    var DraggableItem = {};

    for(var i in sourceColumnItems){
      if(sourceColumnItems[i].id == result.draggableId){
        DraggableItem = sourceColumnItems[i];
      }
    }

    // excluí o objeto arrastado 
    var filterSourceColumnItems = sourceColumnItems.filter(
      (item) => item.id != result.draggableId)

    // adicionar o mesmo na nova pisição 
    filterSourceColumnItems.splice(result.destination.index, 0, DraggableItem);
    console.log(filterSourceColumnItems);

    // Mudar o state
    var columnsCopy = JSON.parse(JSON.stringify(columns));
    columnsCopy[0].items = filterSourceColumnItems;
    setColumns(columnsCopy);
  }
  
  return (
    <div style={{ display:"flex", justifyContent:"center" }}>
      <DragDropContext  onDragEnd={onDragEnd} >
      {columns.map((column) => (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }} >
      <h1>{ column.name }</h1>
        <Droppable droppableId={column.id} key={column.id}>
          {(provided) => (
            <div  
              ref={provided.innerRef}
              style={{ backgroundColor:"lightblue", width:250, height: 500, padding:10, margin:10 }} 
            >

              {column.items.map(( item, index ) => (
                <Draggable draggableId={ item.id } index={ index } key={item.id} >
                  {(provided) => (
                    <div 
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{ backgroundColor:"gray", height:40, marginBottom:10, 
                      ...provided.draggableProps.style,
                      }} 
                    >
                      { item.content }
                    </div>
                  )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
          )}
        </Droppable>
        </div>
      ))}
      </DragDropContext>
    </div>
  );
}

export default App;
