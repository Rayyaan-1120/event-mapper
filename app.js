const toggleicon = document.querySelector('.toggicondiv')
const section1 = document.querySelector('.sec1')



toggleicon.addEventListener('click', () => {
    section1.classList.toggle('toggleclass')
})

const toggling = (sec) => {
    sec.classList.toggle('toggleclass')
}

const dropdown = document.querySelector('.dropdown')
const inputdate = document.querySelector('.inputdate')
const inputtime = document.querySelector('.inputtime')
const inputcost = document.querySelector('.inputcost')
const inputeventname = document.querySelector('.inputeventname')
const inputsub = document.querySelector('.inputsub')
const iddiv  = document.querySelector('.iddiv')
const delall = document.querySelector('.delall')
const delme = document.querySelector('.del')
const formdiv = document.querySelector('.formdiv')
const deletebtnall = document.querySelector('.deletebtnall')
const mainwrapper = document.querySelector('.mainwrapper')
const resdiv = document.querySelector('.resultdiv')


class Events{
     
    id = (Date.now() + '').slice(-10)
    

    constructor(coords,date,time,eventname){
        console.log(this.id)
        this.coords = coords
        this.date = date
        this.time = time
        this.eventname = eventname
        this.calccost()
    }

    calccost(cost,num){
        this.newcost = cost * num
    }

    

    _descriptionset(){

        const months = ['January','February','March','April','May','June','July','August'
    ,'September','October','November','December']

    const date = new Date(this.date)
    const getmonths = date.getMonth()
    const day = date.getDate()

        this._description = ` ${this.eventname} on ${months[getmonths]} ${day}`
        console.log(this._description)
        
    }
}

class Singlecost extends Events{
    type = '1 mem'
    color = 'person1'

    constructor(coords,date,time,eventname,cost1){
        super(coords,date,time,eventname)
        this.cost1 = cost1
        this.calccost(this.cost1, 1)
        this._descriptionset()
// this._showlocation()
    }
}

class Doublecost extends Events{
    type = '2 mem'
    color = 'person2'

    constructor(coords,date,time,eventname,cost2){
        super(coords,date,time,eventname)
        this.cost2 = cost2
        this.calccost(this.cost2,2)
        this._descriptionset()
        // this._showlocation()

    }

}

class Triplecost extends Events{
    type = '3 mem'
    color = 'person3'

    constructor(coords,date,time,eventname,cost3){
        super(coords,date,time,eventname)
        this.cost3 = cost3
        this.calccost(this.cost3,3)
        this._descriptionset()
        // this._showlocation()

    }
}

class Fourcost extends Events{
    type = '4 mem'
    color = 'person4'

    constructor(coords,date,time,eventname,cost4){
        super(coords,date,time,eventname)
        this.cost4 = cost4
        this.calccost(this.cost4,4)
        this._descriptionset()
        // this._showlocation()

        
    }
}

class Fivecost extends Events{
    type = '5 mem'
    color = 'person5'


    constructor(coords,date,time,eventname,cost5){
        super(coords,date,time,eventname)
        this.cost5 = cost5
        this.calccost(this.cost5,5)
        this._descriptionset()
        // this._showlocation()

    }
}





class Fullapp{

    #map
    #mapEvent
    #zoomlevel = 13
    #eventsobj = []
    constructor(){
        console.log(this.#eventsobj)

        // constructor loads when the browser loads 
        // calling getposition immediately
        this._getposition()
        this._getLocalstorage()

        //calling event handlers
        inputsub.addEventListener('click',this._newworkout.bind(this))
        mainwrapper.addEventListener('click',this._pannview.bind(this))
        delall.addEventListener('click',this._deleteallitem.bind(this))
        
    }

 _getposition(){
     if(navigator.geolocation)
     navigator.geolocation.getCurrentPosition(this._loadmap.bind(this),() =>{
         alert('cant get your position')
     })
 }  
 
 _loadmap(position){
   console.log(position)

   //geting coordinates through destructuring

   const {latitude} = position.coords
   const {longitude} = position.coords

   const coords = [latitude,longitude]

   //displaying map through leaflet
    
    this.#map = L.map('map').setView(coords, this.#zoomlevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    
    
    this.#map.on('click',this._showform.bind(this))

    this.#eventsobj.forEach(eve => this._showpopup(eve))
 }

 _showform(event){
    this.#mapEvent = event
    formdiv.classList.remove('hidden')
    inputdate.focus()
    toggling(section1)
    console.log(event)
 }

 _hideform(){
     //emptying input fields

     inputdate.value = inputtime.value = inputcost.value = inputeventname.value = ''
     formdiv.classList.add('hidden')
     deletebtnall.classList.remove('hidden')
     setTimeout(() => {
         toggling(section1)
     },7000)
 }


 _newworkout(e){


    // const testing = () => {
    //     if(!inputd || !inputt)
    // }
    e.preventDefault()

    //selecting input values

    const dropval = dropdown.value
    const inputd = inputdate.value
    const inputt = inputtime.value
    const inputc = +inputcost.value
    const inpute = inputeventname.value
    const {lat,lng} = this.#mapEvent.latlng
    let eventing;


    const testing = (Obj) => {
        eventing = new Obj([lat,lng],inputd,inputt,inpute,inputc)
        this.#eventsobj.push(eventing)
        console.log(this.#eventsobj)
    
        //showing popup marker
    
        // this._showlocation(eventing)
        this._showpopup(eventing)
        this._renderworkonlist(eventing)
        }
    
    //testing conditions by guard clauses

    //for 1 person

    if(dropval === 'person1'){
        if(!inputd || !inputt|| inpute === "" || inputc <= 0) return alert('enter valid values')
        testing(Singlecost)
    }

    //for 2 person
    if(dropval === 'person2'){
        if(!inputd || !inputt|| inpute === "" || inputc <= 0) return alert('enter valid values')
        testing(Doublecost)
    }

    //for 3 person

    if(dropval === 'person3'){
        if(!inputd || !inputt|| inpute === "" || inputc <= 0) return alert('enter valid values')
        testing(Triplecost)
    }

    //for 4 person

    if(dropval === 'person4'){
        if(!inputd || !inputt|| inpute === "" || inputc <= 0) return alert('enter valid values')
        testing(Fourcost)
    }

    //for five person

    if(dropval === 'person5'){
        if(!inputd || !inputt|| inpute === "" || inputc <= 0) return alert('enter valid values')
        testing(Fivecost)
    }


    //hiding form

    this._hideform()

   //setting local storage

   this._setlocalstorage()


 }

//  _showlocation(events){
     
//  }

 _showpopup(events){

    
    
    L.marker(events.coords).addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className: `${events.color}-popup`
    })).setPopupContent(`${events._description}`)
    .openPopup();
    
    
 }


 _renderworkonlist(event){
     const html = `
     <div class="resultdiv" data-id = ${event.id}>
              <h1>${event.eventname}</h1>

              <div class="icon-wrapper">
              <div class="timeshowdiv">
                <i class="far fa-clock"></i>
                 <h2>${event.time}</h2>
              </div>
              <div class="costshowdiv">
                <i class="far fa-money-bill-alt"></i>
                 <h2>${event.newcost}</h2>
              </div>
              <div class="dayshowdiv">
                <i class="far fa-calendar"></i>
                 <h2>${new Date(event.date).getDate()}</h2>
              </div>
              <div class="memshowdiv">
                <i class="fas fa-users"></i>
                 <h2>${event.type}</h2>
              </div>
            </div>
            
          </div>
         `
          
          
          
          iddiv.insertAdjacentHTML('afterend',html)

 }

 _pannview(e){

    const view = e.target.closest('.resultdiv')
    console.log(view)
    if(!view) return
    let viewit = this.#eventsobj.find(work => work.id == view.dataset.id)
    console.log(viewit)
    console.log(view.dataset.id)

    this.#map.setView(viewit.coords,this.#zoomlevel,{
        animate:true,
        pan:{
            duration: 0.8
        }
    })



 }

 _setlocalstorage(){
     localStorage.setItem('events',JSON.stringify(this.#eventsobj))
 }

 _getLocalstorage(){

    const appdata = JSON.parse(localStorage.getItem('events'))
    console.log(appdata)
    if(!appdata) return

    this.#eventsobj = appdata

    this.#eventsobj.forEach(eve => this._renderworkonlist(eve))
 }

 _deleteallitem(){
     localStorage.removeItem('events')
    window.location.reload()


 }

 
}

const newapp = new Fullapp()

