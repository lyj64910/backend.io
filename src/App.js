import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import api from './api' 
import PostView from './Components/PostView' 

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import ReactDOM from 'react-dom';


export default class App extends Component {   
  constructor(props) {     
    super(props)     
    this.state = {       
      title: '',      
      content: '',
      results: [], 
         }
           } 
 
   
  componentDidMount() {     
    this.getPosts()   
  }     

  
  async getPosts() {     
    let _results = await api.getAllPosts()     
    this.setState({ results: _results.data })   
  } 

  handleChange = evt => {
    this.setState({
    [evt.target.name]: evt.target.value,
     })
      } 
 
  handleSubmit = async evt => {
     evt.preventDefault()
    await api.createPost({
      title: this.state.title,
      content: this.state.content,
      })
      this.setState({ 
        title: '',       
        content: '',     
      })

      this.getPosts() 
  } 
 
   handleDelete = async id => {
    await api.deletePost(id)
    this.getPosts()
  }


  render() {
    return (
    <div className="App">
<Container maxWidth="sm">
      <div className="PostingSection">
        <Paper className="PostingForm">
          오늘의 계획: 무슨 일을 했지요?
        <form className="PostingPaper" onSubmit={this.handleSubmit}>
        <TextField id="outlined-basic" label="title" name="title"  onChange={this.handleChange} value={this.state.title} />
        <TextField id="outlined-basic" label="content" multiline rows="4" name="content" onChange={this.handleChange} value={this.state.content} variant="outlined" />     
        <Button variant="outlined" type="submit">제출하기</Button>
        </form>
        </Paper>
        </div> 

      <div className="ViewSection">
        {this.state.results.map(post => (
          <Card className={'card'} variant="outlined">
      <CardContent>
        <Typography >
          <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" type="submit" onClick={event => this.handleDelete(post.id)}>삭제하기</Button>
      </CardActions>
    </Card>

          ))}
      </div>
      </Container>
    </div>
  )
 }
}

// ReactDOM.render(<App />, document.querySelector('#app'));
