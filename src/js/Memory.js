import Card from "./Card";

export default class Memory {
  constructor(lvl = 3) {
    this._allIcons = [];
    this._lvl = lvl;
    this._selected = [];
    this._turned = [];
    this.setUpEvents()
    if (localStorage.getItem("xyz")) {
      const persistedData = JSON.parse(localStorage.getItem("xyz"));
      this._lvl = persistedData.lvl;
      this._allIcons = persistedData.icons;
      this.init();
      //...
    } else {
      this.fetchIcons();
    }
    //setUpEvents => luisteren naar flipped eventTypes
  }
  saveToPersist() {
    localStorage.setItem(
      "xyz",
      JSON.stringify({
        lvl: this._level,
        icons: this._allIcons,
      })
    );
  }
  fetchIcons() {
    fetch("../../icons/selection.json")
      .then((response) => response.json())
      .then((data) => {
        this._allIcons = data.icons.map((el) => el.properties.name);
        this.init();
      })
      .catch((error) => console.log(error));
  }
  init() {
    this.startLevel();
  }
  shuffle = (arra1) => {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }



  startLevel() {
    const numberOfCards = this._lvl * 2;
    const result = [];
    for(let i = 0; i < numberOfCards; i++){
      const uniqueIcon = this._allIcons[Math.floor(Math.random()*this._allIcons.length)];
      result.push(uniqueIcon)
      result.push(uniqueIcon)
    }
    const shuffleResults = this.shuffle(result);
    //console.log(shuffleResults)

    shuffleResults.forEach(icon => {
      new Card(document.getElementById("grid"), `icon-${icon}`)
    });
    //console.log(result)

  }
  setUpEvents() {
    window.addEventListener("flipped", (e) => {
      this._turned.push(e.detail);
      if(this._turned.length === 2){

        if(this._turned[0]._icon === this._turned[1]._icon){
          this._turned[0]._ref.classList.add("matched");
          this._turned[1]._ref.classList.add("matched");
          this._turned = [];
          //window.removeEventListener("click", this._turned)
        } else { 
          setTimeout(() => {
          this._turned[0]._ref.classList.remove("flipped");
          this._turned[0]._isFlipped = false;
          this._turned[1]._ref.classList.remove("flipped");
          this._turned[1]._isFlipped = false;
          this._turned = [];
        },1500)
        } 
      }
    });
    //var parent = document.getElementById("memory");
    //var nodesSameClass = parent.getElementsByClassName("matched");
    //console.log(nodesSameClass.length);
    
    
    
  }
}
