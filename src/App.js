import './App.css';
import { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component{
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    try{
      const res1 = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await res1.json()
      this.setState({monsters: users})
    }
    catch(err){
      console.log('An error occured')
    }

  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value})
  }

  render(){
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
        monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
      )
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}>
        </CardList>
        
    </div>
    )
  }
}


export default App;
