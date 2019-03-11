import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/home/modal'
import { editCongressPost, addCongressPost, deleteCongressPost, congressSetEdit, uploadCongressImage } from '../../actions/home/congress-actions';

class ActiveCongressCard extends React.Component {
    constructor(props) {
      super(props);
      this.quote = React.createRef();
      this.quoteReference = React.createRef();
      this.quoteLink = React.createRef();
      this.description = React.createRef();
      this.title = React.createRef();
      this.image = React.createRef();
      this.state = {
        editImg: "",
        submitDisabled: false,
        titleError: ""
      }
    }

    getEditButton () {
      return (
          <button className="edit-button"onClick={()=>{
          this.setState({
            editImg: this.props.activeCongressPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
          })
          this.props.dispatch(congressSetEdit(true))
          }}>Edit</button>
      )
    }

    getDeleteButton () {
      return (
          <button className="delete-button" onClick={()=>{
          this.props.dispatch(deleteCongressPost(this.props.activeCongressPost._id))
          document.body.style.overflow = "visible"
          this.props.dispatch(this.props.dispatch(hideModal()))
          }}>Delete</button>
      )
    }
    
    render() {
        if(this.props.loading){
          return (
            <section className="small-loader"/>
          )
        } else {
        if(this.props.editing){
          
          return (
            <div className="pro-list-item-active-edit">
              <div>
                <label className="title-label">Title</label>
                <input className="title-input" ref={this.title} defaultValue={this.props.activeCongressPost.title || ""}
                onChange={(e)=>{
                  if(e.target.value.length < 1){
                    this.setState({
                      titleError: "title field is required",
                      submitDisabled: true
                    })
                  } else if (e.target.value.length >= 1 && e.target.value.length < 70){
                    this.setState({
                      titleError: "",
                      submitDisabled: false
                    })
                  } 
                }}
                />
                <label className="title-error">{this.state.titleError}</label>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activeCongressPost.quote || ""}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activeCongressPost.quoteReference || ""}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activeCongressPost.quoteLink || ""}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activeCongressPost.description || ""}/>
  
                <label className="image-upload-label">Image</label>
                <input className="image-upload-input" key={this.state.key} onChange={(e)=>{
                  this.setState({
                    editImg: URL.createObjectURL(this.image.current.files[0])
                  })
                }
                } 
                  name="file" ref={this.image} type="file" accept="image/png, image/jpeg"/>
  
                <div className="active-image-container-edit">
                  <img className="image" alt="" src={
                    this.state.editImg
                    }/>
                </div>
  
                <button className="confirm-button" onClick={()=>{
                  var id = this.props.activeCongressPost._id
                  if(this.image.current.files[0]){
                    var imgData = new FormData()
                    imgData.append("file", this.image.current.files[0])
                    this.props.dispatch(uploadCongressImage(imgData))
                    .then((res)=>{
                    console.log(res)
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: res.imgUrl.url
                    }
                    id ? this.props.dispatch(editCongressPost(id, data)) : this.props.dispatch(addCongressPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(congressSetEdit(false))
                  })
                  } else {
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: this.props.activeCongressPost.imgUrl || ""
                    }
                    id ? this.props.dispatch(editCongressPost(id, data)) : this.props.dispatch(addCongressPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(congressSetEdit(false))
                  } 
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(congressSetEdit(false))
                  }}>X</button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="pro-list-item-active">
            <div>
            <h2>{this.props.activeCongressPost.title}</h2>

            <div className="active-image-container">
              <img className="image" alt="" src={this.props.activeCongressPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>

            <p className="quote">
                {this.props.activeCongressPost.quote}
                <span className="reference-span">- 
                  {this.props.activeCongressPost.quoteLink ? <a target="_blank" rel="noopener noreferrer" href={this.props.activeCongressPost.quoteLink}>{this.props.activeCongressPost.quoteReference}</a>:this.props.activeCongressPost.quoteReference}
                </span>
            </p>
                {this.props.activeCongressPost.description ? <p className="comments">{this.props.activeCongressPost.description}</p> : <p/>}
            
            <label className="collapse-button" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
            }}>X</label>
              {/* if logged in show edit and delete buttons */}
              {this.props.loggedIn ? this.getEditButton() : ""}
              {this.props.loggedIn ? this.getDeleteButton() : ""}
              </div>
            </div>)
        }
      }
    }
}

const mapStateToProps = state => ({
    editing: state.congressReducers.editing,
    loading: state.congressReducers.activeCongressPostLoading,
    imgUrl: state.congressReducers.imgUrl,
    loggedIn: state.auth.currentUser !== null,
    activeCongressPost: state.congressReducers.activeCongressPost
  });

export default connect (mapStateToProps) (ActiveCongressCard)