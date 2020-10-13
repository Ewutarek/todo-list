
class Task 
{
    constructor(text)
    {
        this.id = window.crypto.getRandomValues(new Uint8Array(3)).join(""),
        this.text = text,
        this.status = 0
    }
}

const state = {
    tasks: []
}

const view = (state) => `
    <section>
        <h1>Tasks</h1>
        <ul>
            ${state.tasks.map(task => 
                `<li 
                onclick= "app.run('done', ${task.id})"
                class = "${task.status === 0 ? '': 'done'}"
                 >${task.text}</li> 
                <button onclick="app.run('delete', ${task.id} )" >Delete</button>` 
            ).join("")}
        </ul>
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="task" placeholder="add a task" required/>
            <button>Add</button>
        </form>
    </section>
`
const update = {
    add: (state, form) => {
        const data = new FormData(form)
        state.tasks.push(new Task(data.get('task')))
        return state
    },

    done: (state,id) =>{
        const task= state.tasks.find(task => task.id == id)
        task.status =1
        console.log(task.status)
        return state
    },

    delete: (state, id) => {

        var index = 0
        var count = 0

        state.tasks.forEach(task => {
        if ((id == task.id) && (task.status == 1)) 
        {
            index = count
        }
        count ++;
        })
        state.tasks.splice(index,1)

        return state
    }
     
}
app.start('toDoApp', state, view, update)

