import React, { Component } from 'react';
import PostView from "./posts/postView";
import {dbPromise} from './idb';


class PostFavList extends Component {


    defaultPage = 1

    state = {
        posts: []
    }

    componentDidMount(){
        this.readContentFromIdb()
    }

    readContentFromIdb = () => {
        dbPromise.then(db => {
            return db.transaction('posts-fav')
                .objectStore('posts-fav').getAll();
        }).then((item)=>{
                this.setState({
                    ...this.state,
                    posts: item
                })
            }
        )
    }

    render() {


        return (
            <div id="content">
                <h1>
                    My favourite
                </h1>

                    {this.state.posts.length?(
                        this.state.posts.map((post)=>
                            <PostView
                                reloadIndexDb={this.readContentFromIdb}
                                listFacouriteId={this.state.listFacouriteId || new Map()}
                                allFavourite={true}
                                post={post}
                                key={post.id}></PostView>
                        )
                    ):(
                        <h4>
                            Firstly add some post to your favourite
                        </h4>
                    )}
            </div>
        )
    }

}

export default PostFavList;