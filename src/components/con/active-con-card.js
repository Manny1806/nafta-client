import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/home/modal'
import { editConPost, addConPost, deleteConPost, conSetEdit, uploadConImage } from '../../actions/home/con-actions';

class ActiveConCard extends React.Component {
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
            editImg: this.props.activeConPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
          })
          this.props.dispatch(conSetEdit(true))
          }}>Edit</button>
      )
    }

    getDeleteButton () {
      return (
          <button className="delete-button" onClick={()=>{
          this.props.dispatch(deleteConPost(this.props.activeConPost._id))
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
                <input className="title-input" ref={this.title} defaultValue={this.props.activeConPost.title || ""}
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
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activeConPost.quote || ""}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activeConPost.quoteReference || ""}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activeConPost.quoteLink || ""}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activeConPost.description || ""}/>
  
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
                  var id = this.props.activeConPost._id
                  if(this.image.current.files[0]){
                    var imgData = new FormData()
                    imgData.append("file", this.image.current.files[0])
                    this.props.dispatch(uploadConImage(imgData))
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
                    id ? this.props.dispatch(editConPost(id, data)) : this.props.dispatch(addConPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(conSetEdit(false))
                  })
                  } else {
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: this.props.activeConPost.imgUrl || ""
                    }
                    id ? this.props.dispatch(editConPost(id, data)) : this.props.dispatch(addConPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(conSetEdit(false))
                  } 
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(conSetEdit(false))
                  }}>X</button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="pro-list-item-active">
            <div>
            <h2>{this.props.activeConPost.title}</h2>

            <div className="active-image-container">
              <img className="image" alt="" src={this.props.activeConPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>

            <p className="quote">
                {this.props.activeConPost.quote}
                <span className="reference-span">- 
                  {this.props.activeConPost.quoteLink ? <a target="_blank" rel="noopener noreferrer" href={this.props.activeConPost.quoteLink}>{this.props.activeConPost.quoteReference}</a>:this.props.activeConPost.quoteReference}
                </span>
            </p>
                {this.props.activeConPost.description ? <p className="comments">{this.props.activeConPost.description}</p> : <p/>}
            
            <button className="collapse-button" onClick={()=>{
              document.body.style.overflow = "visible"
              this.props.dispatch(this.props.dispatch(hideModal()))
            }}>X</button>
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
    editing: state.conReducers.editing,
    loading: state.conReducers.activeConPostLoading,
    imgUrl: state.conReducers.imgUrl,
    loggedIn: state.auth.currentUser !== null,
    activeConPost: state.conReducers.activeConPost
  });

export default connect (mapStateToProps) (ActiveConCard)