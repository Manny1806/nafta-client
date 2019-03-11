import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../../actions/home/modal'
import { editProPost, addProPost, deleteProPost, proSetEdit, uploadProImage } from '../../actions/home/pro-actions';

class ActiveProCard extends React.Component {
    constructor(props) {
      super(props);
      this.quote = React.createRef();
      this.quoteReference = React.createRef();
      this.quoteLink = React.createRef();
      this.description = React.createRef();
      this.title = React.createRef();
      this.type = React.createRef();
      this.image = React.createRef();
      
      // this.staticImage = this.staticImage.bind(this);
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
            editImg: this.props.activeProPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"
          })
          this.props.dispatch(proSetEdit(true))
          }}>Edit</button>
      )
    }

    getDeleteButton () {
      return (
          <button className="delete-button" onClick={()=>{
          this.props.dispatch(deleteProPost(this.props.activeProPost._id))
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
                <input className="title-input" ref={this.title} defaultValue={this.props.activeProPost.title || ""}
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

                <label className="type-label">Type</label>
                <select className="type-input" ref={this.type} defaultValue={this.props.activeProPost.type || "Individual"}>
                    <option value="Individual">Individual</option>
                    <option value="Corporate Interest">Corporate Interest</option>
                    <option value="Business Press">Business Press</option>
                </select>
    
                <label className="quote-label">Quote</label>
                <textarea className="quote-input" ref={this.quote} defaultValue={this.props.activeProPost.quote || ""}/>
  
                <label className="quote-ref-label">Quote Reference</label>
                <input className="quote-ref-input" ref={this.quoteReference} defaultValue={this.props.activeProPost.quoteReference || ""}/>
                
                <label className="quote-link-label">Quote Link</label>
                <input className="quote-link-input" ref={this.quoteLink} defaultValue={this.props.activeProPost.quoteLink || ""}/>
  
                <label className="description-label">Comments</label>
                <textarea className="description-input" ref={this.description} defaultValue={this.props.activeProPost.description || ""}/>
  
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
                  var id = this.props.activeProPost._id
                  if(this.image.current.files[0]){
                    var imgData = new FormData()
                    imgData.append("file", this.image.current.files[0])
                    this.props.dispatch(uploadProImage(imgData))
                    .then((res)=>{
                    //console.log(res)
                    const data = {
                      title: this.title.current.value,
                      type: this.type.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: res.imgUrl.url
                    }
                    id ? this.props.dispatch(editProPost(id, data)) : this.props.dispatch(addProPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(proSetEdit(false))
                  })
                  } else {
                    const data = {
                      title: this.title.current.value,
                      quote: this.quote.current.value,
                      quoteReference: this.quoteReference.current.value || "",
                      quoteLink: this.quoteLink.current.value || "",
                      description: this.description.current.value || "",
                      imgUrl: this.props.activeProPost.imgUrl || ""
                    }
                    id ? this.props.dispatch(editProPost(id, data)) : this.props.dispatch(addProPost(data))
                    document.body.style.overflow = "visible"
                    this.props.dispatch(hideModal())
                    this.props.dispatch(proSetEdit(false))
                  } 
                }}>Confirm</button>
    
                <button className="cancel-button" onClick={()=>{
                  document.body.style.overflow = "visible"
                  this.props.dispatch(hideModal())
                  this.props.dispatch(proSetEdit(false))
                  }}>X</button>
              </div>
            </div>
          )
        } else {
          return (
            <div className="pro-list-item-active">
            <div>
            <h2>{this.props.activeProPost.title}</h2>

            <div className="active-image-container">
              <img className="image" alt="" src={this.props.activeProPost.imgUrl || "http://www.pinnacleeducations.in/wp-content/uploads/2017/05/no-image.jpg"}/>
            </div>

            <p className="quote">
                {this.props.activeProPost.quote}
                <span className="reference-span">- 
                  {this.props.activeProPost.quoteLink ? <a target="_blank" rel="noopener noreferrer" href={this.props.activeProPost.quoteLink}>{this.props.activeProPost.quoteReference}</a>:this.props.activeProPost.quoteReference}
                </span>
            </p>
                {this.props.activeProPost.description ? <p className="comments">{this.props.activeProPost.description}</p> : <p/>}
            
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
    editing: state.proReducers.editing,
    loading: state.proReducers.activeProPostLoading,
    imgUrl: state.proReducers.imgUrl,
    loggedIn: state.auth.currentUser !== null,
    activeProPost: state.proReducers.activeProPost
  });

export default connect (mapStateToProps) (ActiveProCard)