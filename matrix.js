const canvas = document.getElementById('matrixCanvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight
    }
    draw(){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length))
        if(this.y * this.fontSize < this.canvasHeight){
            ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        }
        this.y+=1
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
    #initialize(){
        for (let i = 0; i < this.columns ; i++){
            this.symbols[i] = new Symbol(i, -Math.floor(Math.random()*20), this.fontSize, this.canvasHeight);
        }
    }
    
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 120;
const nextFrame = 1000/fps;
let timer = 0;

let count = 0
function animate(timeStamp){
    document.body.style.overflow = 'hidden'
    if(count < 150){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        if(timer > nextFrame){
            ctx.fillStyle = 'rgba(0,0,0,0.05)'
            ctx.textAlign = 'center';
            ctx.fillRect(0,0, canvas.width, canvas.height)
            ctx.fillStyle = '#0aff0a'
            ctx.font = effect.fontSize + 'px monospace';
            effect.symbols.forEach(symbol => symbol.draw(ctx))
            timer = 0;
        }else{
            timer += deltaTime
        }    
        count++    
        requestAnimationFrame(animate)
    }else{
        count = 0
        effect.symbols.forEach(sym => sym.y = -Math.floor(Math.random()*20))
        ctx.clearRect(0,0, canvas.width, canvas.height)
        document.body.style.overflow = 'unset'
    }
}
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
} )

export const matrix = {animate: animate}