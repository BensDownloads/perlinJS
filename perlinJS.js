
        class perlin
        {

            //get lattice size and grid size and make enough lattice points
            constructor(sizeX=0, sizeY=0, sizeC=0)
            {
                this._cellSize=sizeC;

                let lx=Math.trunc(sizeX/sizeC)+2;
                let ly=Math.trunc(sizeY/sizeC)+2;

                this.lattice=[];
                for(j=0; j<ly; j++)
                {
                    this.lattice[j]=[];
                    for(i=0; i<lx;i++)
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
                let s=0;
                let t=0;
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
                return (this._interp(u, v, y-gridPointY0*this._cellSize))*255;
            }

            _getDotProduct(x=0, y=0, ix=0, iy=0)
            {
                //get the distance vector in pixels
                let dx=x-ix*this._cellSize;
                let dy=y-iy*this._cellSize;

                //gets the dot product of that vector               
                return (dx*this.lattice[iy][ix].x)+(dy*this.lattice[iy][ix].y);
            }

            _interp(s=0, t=0, w=0)
            {
                w=w/this._cellSize;
                s=s/this._cellSize;
                t=t/this._cellSize;

                return s+((3*(w*w)-2*(w*w*w))*(t-s));
            }
        }