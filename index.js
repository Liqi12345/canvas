$(function(){
	let canvas = $('canvas')[0];
let pal = new Palette(canvas);
let li = document.querySelectorAll('.shape>li');
let color = document.querySelectorAll('.style>li')


console.log(color)

li.forEach(function(ele){
	let type = ele.id;
	ele.onclick = function(){
		li.forEach(function(e){
			e.classList.remove('hot')
		})
		ele.classList.add('hot')
		if(type == 'polygon' || type == 'horn'){
			
			let num = prompt('请输入边数或者角数')
			pal[type](num)
		}else{
			pal[type]()
		}
	}	

      // fill.addEventListener('click',function(){
      // 	   canvas.style = 'fill';
      // })
      //  stroke.addEventListener('click',function(){
      // 	   canvas.style = 'stroke';
      // })

       color.forEach(e=>{
            e.onclick = function(){
                if(e.className == 'stroke'){
                    canvas.style = 'stroke';
                }else if(e.className == 'fill'){
                    canvas.style = 'fill';
                }
            }
      })

		
	})
})


           