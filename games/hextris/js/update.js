function update(e){MainHex.dt=e,1==gameState&&(waveone.update(),MainHex.ct-waveone.prevTimeScored>1e3&&(waveone.prevTimeScored=MainHex.ct));var o,l,c,n=99;for(o=0;o<blocks.length;o++)MainHex.doesBlockCollide(blocks[o]),blocks[o].settled?blocks[o].removed||(blocks[o].removed=1):blocks[o].initializing||(blocks[o].distFromHex-=blocks[o].iter*e*settings.scale);for(o=0;o<MainHex.blocks.length;o++)for(l=0;l<MainHex.blocks[o].length;l++)1==MainHex.blocks[o][l].checked&&(consolidateBlocks(MainHex,MainHex.blocks[o][l].attachedLane,MainHex.blocks[o][l].getIndex()),MainHex.blocks[o][l].checked=0);for(o=0;o<MainHex.blocks.length;o++){for(n=99,l=0;l<MainHex.blocks[o].length;l++)2==(c=MainHex.blocks[o][l]).deleted&&(MainHex.blocks[o].splice(l,1),blockDestroyed(),l<n&&(n=l),l--);if(n<MainHex.blocks[o].length)for(l=n;l<MainHex.blocks[o].length;l++)MainHex.blocks[o][l].settled=0}for(o=0;o<MainHex.blocks.length;o++)for(l=0;l<MainHex.blocks[o].length;l++)c=MainHex.blocks[o][l],MainHex.doesBlockCollide(c,l,MainHex.blocks[o]),MainHex.blocks[o][l].settled||(MainHex.blocks[o][l].distFromHex-=c.iter*e*settings.scale);for(o=0;o<blocks.length;o++)1==blocks[o].removed&&(blocks.splice(o,1),o--);MainHex.ct+=e}