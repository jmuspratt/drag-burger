class DragBurger {
    constructor() {
        const button = document.querySelector('.button');
        this.$wrap = $('.wrap');
        this.$button = $('.button');
        this.$main = $('.main');

        this.savedButtonPos = {
            x: 0,
            y: 0,
        };

        this.savedMainX = 0;
        this.menuIsOpen = false;

        // Always remove snapping class after transition ends
        (this.$button, this.$main).on('transitionend', () => {
            this.$wrap.removeClass('snapping');
        });

  
        let mc = new Hammer(button);

        // Tap burger
        mc.on('tap', (event)=>{
            const windowWidth = document.documentElement.clientWidth;
            this.snap(!this.menuIsOpen, windowWidth);
        });

        // Drag burger
        mc.on('panleft panright', (event) => {
            const moveMain =  1.2 * event.deltaX;
            const moveButton =  {
                x: event.deltaX,
                y: event.deltaY,
            };

            const mainPosX = moveMain + this.savedMainX <= 0 ? moveMain + this.savedMainX : 0; // don't let it go right of origin
            const buttonPosX = moveButton.x + this.savedButtonPos.x;
            const buttonPosY = moveButton.y + this.savedButtonPos.y;


            $('.main').css('transform', `translateX(${mainPosX}px)`);
            $('.button').css('transform', `translate(${buttonPosX}px, ${buttonPosY}px)`);
        });

        // Release burger
        mc.on('panend', (event)=>{
            const windowWidth = document.documentElement.clientWidth;
            const snapOpenMark = - windowWidth / 2;
            const snapOpen = event.deltaX < snapOpenMark;
            this.snap(snapOpen, windowWidth);
        })
    }

    snap(snapOpen, windowWidth) {

        this.$wrap.addClass('snapping');
            
        if (snapOpen) {
            console.log('snap open');
            const buttonDestinationX = -(windowWidth - 80);
            const mainDestinationX = -(windowWidth - 30);
            $('.button').css('transform', `translateX(${buttonDestinationX}px)`);
            $('.main').css('transform', 'translateX(' + mainDestinationX + 'px)');
            this.savedButtonPos.x = buttonDestinationX;
            this.savedButtonPos.y = buttonDestinationY;
            
            this.savedMainX = mainDestinationX;
            this.menuIsOpen = true;
        }
        // snapClosed
        else {
            console.log('snap closed');
            $('.button').css('transform', 'translateX(' + 0 + 'px)');
            $('.main').css('transform', 'translateX(' + 0 + 'px)');
            this.savedButtonPos.y = 0;
            this.savedMainX = 0;
            this.menuIsOpen = true;
        }
    }
};


new DragBurger;





