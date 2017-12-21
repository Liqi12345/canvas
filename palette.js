class Palette{
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.cw = this.canvas.width;
		this.ch = this.canvas.height;
		this.img = [];
		// this.style = 'fill';
		this.style = 'stroke';

	}
	// 直线,不能作为构造函数,没有arguments,没有this
	line(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX, my = e.offsetY;
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				that.ctx.beginPath();
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				
				that.ctx.moveTo(ox,oy);
				that.ctx.lineTo(mx,my);
				that.ctx.closePath();
				that.ctx.stroke();
			}
			that.canvas.onmouseup = function(){
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
				that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
				
			}
		}
		document.onkeydown = function(e){
			if(e.ctrlKey && e.key == 'z' && that.img.length-1){
				that.img.pop();
				that.ctx.putImageData(that.img[that.img.length-1],0,0)
			}
		}
	}

	// 虚线
	dash(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX, my = e.offsetY;
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				that.ctx.setLineDash([5,15]);
				that.ctx.set
				that.ctx.beginPath();
				that.ctx.moveTo(ox,oy);
				that.ctx.lineTo(mx,my);
				that.ctx.closePath();
				that.ctx.stroke();
				that.ctx.setLineDash([0,0])
			}
			that.canvas.onmouseup = function(){
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
				that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
				
			}
		}
		document.onkeydown = function(e){
			if(e.ctrlKey && e.key == 'z' && that.img.length-1){
				that.img.pop();
				that.ctx.putImageData(that.img[that.img.length-1],0,0)
			}
		}
	}

	// 铅笔that.ctx[that.style]()
	pencil(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			that.ctx.beginPath();
			that.ctx.moveTo(ox,oy);
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX, my = e.offsetY;
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				
				// that.ctx.moveTo(ox,oy);
				that.ctx.lineTo(mx,my);
				// that.ctx.closePath();
				that.ctx.stroke();
			}
			that.canvas.onmouseup = function(){
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
				that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
				
			}
		}
		document.onkeydown = function(e){
			if(e.ctrlKey && e.key == 'z' && that.img.length-1){
				that.img.pop();
				that.ctx.putImageData(that.img[that.img.length-1],0,0)
			}
		}
	}

	// 圆形
	radius(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			
			that.canvas.onmousemove = function(e){

				let mx = e.offsetX, my = e.offsetY;
				let r = Math.sqrt(Math.pow(mx - ox,2) + Math.pow(oy - my,2))
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				that.ctx.beginPath();
				
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				// that.ctx.moveTo(ox,oy);
				that.ctx.arc(ox,oy,r,0,2*Math.PI)
				
				// that.ctx.lineTo(mx,my);
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.canvas.onmouseup = function(){
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
				that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch))
				
			}
		}
		document.onkeydown = function(e){
			if(e.ctrlKey && e.key == 'z' && that.img.length-1){
				that.img.pop();
				that.ctx.putImageData(that.img[that.img.length-1],0,0)
			}
		}
	}

	// 多边形
	polygon(num){
		let that = this;
		num = num||5;
		// 角度
		let deg = 2*Math.PI/num;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX, my = e.offsetY;

				// 开始路径之前清除一次
				that.ctx.clearRect(0,0,that.cw,that.ch)
				that.ctx.beginPath()
				// 数组里保存像素
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				
				// 确定半径
				let r = Math.sqrt(Math.pow(my-oy,2) + Math.pow(ox-mx,2))
				that.ctx.moveTo(ox + r, oy)
				// 确定点
				for(let i = 0; i < num;i++){
					let x = ox + r*Math.cos(deg * i)
					let y = oy + r*Math.sin(deg * i)
					that.ctx.lineTo(x,y)
				}
				
				
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.canvas.onmouseup=function(){
				that.canvas.onmousemove=null;
				that.canvas.onmouseup=null;
				// 数组里添加像素
				that.img.push(that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height));
			}
		}
	}

	// 多角形
	horn(num){
		num = num || 5;

		let that = this;
		let deg = Math.PI/num;

		that.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX, my = e.offsetY;

				// 开始路径之前清除一次
				that.ctx.clearRect(0,0,that.cw,that.ch)
				that.ctx.beginPath()
				// 数组里保存像素
				if(that.img.length){
					that.ctx.putImageData(that.img[that.img.length-1],0,0)
				}
				
				// 确定半径

				let r = Math.sqrt(Math.pow(my-oy,2) + Math.pow(mx-ox,2))
				// that.ctx.moveTo(ox + r, oy)
				// 确定点
				let x,y;
				for(let i = 0; i < num*2;i++){
					if(i % 2 == 0){
						 x = ox + r/3*Math.cos(deg * i)
						 y = oy + r/3*Math.sin(deg * i)
					}else{
						x = ox + r*Math.cos(deg * i)
						y = oy + r*Math.sin(deg * i)
					}
					
					that.ctx.lineTo(x,y)
				}
				
				
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.canvas.onmouseup=function(){
				that.canvas.onmousemove=null;
				that.canvas.onmouseup=null;
				// 数组里添加像素
				that.img.push(that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height));
			}
		}
	}

	// 矩形
	rectangle(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch)
				that.ctx.beginPath();
				that.ctx.moveTo(ox,oy);
				that.ctx.rect(ox, oy, mx-ox, my-oy);
				
				that.ctx.closePath();
				that.ctx[that.style]();
			}
			that.canvas.onmouseup = function(){
				that.canvas.onmousemove=null;
				that.canvas.onmouseup=null;
			}
		}
	}

}



