
        /*
        Perlin noise class
        implementation of:
        https://en.wikipedia.org/wiki/Perlin_noise#Implementation
        */
       class perlin
       {

           //get lattice size and grid size and make enough lattice points
           constructor(sizeX=0, sizeY=0, sizeC=0)
           {
               //hold the total size of the image and each cell's size
               this._cellSize=sizeC;
               this._x=sizeY;
               this._y=sizeY;

               //get the total number of cells in the image
               let lx=Math.trunc(sizeX/sizeC)+2;
               let ly=Math.trunc(sizeY/sizeC)+2;

               //start making the lattice y
               this.lattice=[];
               for(let j=0; j<ly; j++)
               {
                   //start making the lattice x
                   this.lattice[j]=[];

                   //get random numbers for each lattice point
                   for(let i=0; i<lx;i++)
                   {
                       this.lattice[j][i]={x:0,y:0};
                       this.lattice[j][i].x=((Math.random()*2)-1)*this._cellSize;
                       this.lattice[j][i].y=((Math.random()*2)-1)*this._cellSize;
                   }
               }
               
           }

           //gets a pixel at the x and y position
           getHeight(x=0, y=0)
           {
               //dot products
               let s=0;
               let t=0;
               //iterpolations
               let u=0;
               let v=0;

               //get the lattice points of the current cell
               let gridPointX0=Math.trunc(x/this._cellSize);
               let gridPointY0=Math.trunc(y/this._cellSize);
               let gridPointX1=gridPointX0+1;
               let gridPointY1=gridPointY0+1;

               //get the bottom dot product of the lower left corner
               s=this._getDotProduct(x, y, gridPointX0, gridPointY0);
               //get the top dot product of the lower right corner
               t=this._getDotProduct(x, y, gridPointX1, gridPointY0);
               //interpolate bottom s and t with the distance in pixels
               //from the lower x lattice point for u
               u=this._interp(s, t, x-gridPointX0*this._cellSize);

               //get the bottom dot product of the upper left corner
               s=this._getDotProduct(x, y, gridPointX0, gridPointY1);
               //get the top dot product of the upper right corner
               t=this._getDotProduct(x, y, gridPointX1, gridPointY1);
               //interpolate bottom s and t with the distance in pixels
               //from the lower x lattice point for v
               v=this._interp(s, t, x-gridPointX0*this._cellSize);

               //interpolate both upper and lower interplations, u and v,
               //from the lower y lattice point for height
               return (this._interp(u, v, y-gridPointY0*this._cellSize));
           }

           _getDotProduct(x=0, y=0, ix=0, iy=0)
           {
               //get the distance of x and y from the lattice point
               let dx=x-(ix*this._cellSize);
               let dy=y-(iy*this._cellSize);

               //gets the dot product             
               return (dx*this.lattice[iy][ix].x)+(dy*this.lattice[iy][ix].y);
           }

            //smooth the two vectors togeather, s and t
            //depending on the distance of x and the lattice point, w
            _interp(s=0, t=0, w=0)
            {
                //scale the values down by one cell size
                w=w/this._cellSize;
                s=s/this._cellSize;
                t=t/this._cellSize;

                //return a smoothing function
                return s+((3*(w*w)-2*(w*w*w))*(t-s));
            }
       }