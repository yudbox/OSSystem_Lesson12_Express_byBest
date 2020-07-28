import React, { useState, useEffect } from 'react';
import cl from './Thoughts.module.css'
import {thoughtsAPI} from '../../api/api'


//////////////////////////////////////////////////////////////////////////////////////

const Thought = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [thoughtInput, setThoughtInput] = useState('')
    const [timer, setTimer] = useState(Date.now())

    useEffect( () => {
        setThoughtInput(props.value)
        let upadatingTimer = setInterval(() => setTimer(Date.now()), 60000);
        return () => clearInterval(upadatingTimer)        
    },[])

    // allows to change Edit mode and edit already created Thoughts

    const changeEditMode = (value) => {
        setEditMode(value)
    }

     // takes an actual value of input in every edit Thought to give it to func changeThoughtValue

    const changeThoughtInputValue = (e) => {
        let text = e.target.value
        setThoughtInput(text)
    }

         // change status of Like button

    const changeLikeValue = () => {
        let thoughtId = props.id
        let body = {
            liked: !props.liked,
        }
        thoughtsAPI.updateThoughtLike(body, thoughtId)
        .then(response => console.log(response))
        .then(()=> props.getActualThoughts())
    }

         // change status of Favorite button

    const changeFavoriteValue = () => {
        let thoughtId = props.id
        let body = {
            favorite: !props.favorite,
        }
        thoughtsAPI.updateThoughtFavofite(body, thoughtId)
        .then(response => console.log(response))
        .then(()=> props.getActualThoughts())
    }

    // change value of every Thought text when Edit mode was deactive

    const changeThoughtValue = () => {
        changeEditMode(false)
        let thoughtId = props.id
        let body = {
            text: thoughtInput,
            lastEditted: Date.now()
        }
        thoughtsAPI.updateThoughtText(body, thoughtId)
        .then(()=>setTimer(Date.now()))
        .then(()=> props.getActualThoughts())
    }

    // delete the single thought

    const deleteThought = () => {
        let thoughtId = props.id
        thoughtsAPI.deleteThought(thoughtId)
        .then(()=> props.getActualThoughts())
    }

    //finction calculate time which passed after last edition of Thought

    const timeAfterEditionThought = () => {

        return Math.floor(timer/60000 - props.lastEditted/60000)

    }

    return(
    <div className={cl.singleThought}>
        <div className={cl.singleThought_main}>
            <div className={cl.singleThought_info}>
                <p className={cl.singleThought_edition}>Added/edit by you {timeAfterEditionThought()} minutes ago</p>
                {editMode ? 
                <input onChange={changeThoughtInputValue} className={cl.singleThought_input} value={thoughtInput} placeholder="Just edit your thought" /> : 
                <p>{thoughtInput}</p>}
                
            </div>

           {/* This is TOOLS MODE which allows to edit and delete single thought */}

            <div className={cl.singleThought_tools}>
                {editMode ? 
                <span onClick={changeThoughtValue} className="material-icons icon save-icon">save</span> : 
                <span onClick={()=>changeEditMode(true)} className="material-icons icon edit-icon">create</span>}
                
                <span onClick={deleteThought} className="material-icons icon delete-icon">delete_forever</span>
            </div>
        </div>

            {/* This is ATTITUDE MODE which allows to show your attitude to  single thought */}

        <div className={cl.singleThought_attitude}>
            
            <span onClick={changeLikeValue} className={props.liked ? "material-icons icon liked" : "material-icons icon"}>favorite</span>
            <span onClick={changeFavoriteValue} className={props.favorite ?  "material-icons icon favorite" : "material-icons icon"}>thumb_up</span>
        </div>
    </div>
    )
}

/////////////////////////////////////////////////////////////////////////////////////////////

const ThoughtInput = (props) => {

    const [ thoughtValue, setThoughtValue] = useState('');

    const onChangeThoughtInput = (e) => {
        let thoughtValue = e.target.value;
        setThoughtValue(thoughtValue)
    }

    const postThought = (e) => {
        if(e.key === 'Enter') {
            let thoughtId = Math.floor(Math.random() * 100);

            let body = {
                id: thoughtId,
                value: thoughtValue,
                liked: false,
                favorite: false,
                lastEditted: Date.now()
            }
            thoughtsAPI.setThought(body)
            .then(response => console.log(response))
            .then(()=> thoughtsAPI.getThoughts())
            .then(()=> setThoughtValue(''))
            .then(()=> props.getActualThoughts())
            
        }

    }
    
    return (
         <div className={cl.thoughts_input}>
        <input onKeyPress={postThought} onChange={onChangeThoughtInput} value={thoughtValue} placeholder='Write your thought and click enter' />
    </div>
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Thoughts = (props) => {

    const [thoughts, setThoughts] = useState([]);

    useEffect( () => {
        getActualThoughts() 
    },[])

    const getActualThoughts = () => {
        thoughtsAPI.getThoughts()
        .then(thoughts=> {
            setThoughts(thoughts)})
    }


    return (
        <div className={cl.thoughts_container}>
            <h1>My thoughts APP</h1>
            <div className={cl.thoughts}>
                {thoughts.length > 0 ? thoughts.map(thought => <Thought getActualThoughts={getActualThoughts} key={thought.id} {...thought}  />) : null}
            </div>
            <ThoughtInput getActualThoughts={getActualThoughts} />
        </div>
    )
}
export default Thoughts;