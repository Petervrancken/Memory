export default class Card {
  constructor(holder, icon) {
    this._holder = holder;
    this._icon = icon;
    this._flippedEvent = new CustomEvent("flipped", { detail: this });
    this._ref = this.init();
    this._isFlipped = false;
    this.setUpEvents();
  }
  init() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `
            <div id="memory" class="card" data-framework="${this._icon}">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                </div>
                <div class="flip-card-back">
                  <div id="color" class="centericon" style="color:purple;font-size:75px">
                    <svg class="icon ${this._icon}">
                      <use xlink:href="./icons/symbol-defs.svg#${this._icon}"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>    
        `
    );
    return this._holder.querySelector(".card:last-child");
  }

  setUpEvents() {
    this._ref.addEventListener("click", this.flip);
  }



  flip = () => {
    if (!this._isFlipped) {
      this._isFlipped = true;
      this._ref.classList.add("flipped");

    } else {
      this._isFlipped = false;
    }
    dispatchEvent(this._flippedEvent);
  };
}

