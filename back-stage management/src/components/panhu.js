import React from 'react';

function  Panhu({adname}) {
    return( <div className='sidenav-header d-flex align-items-center justify-content-center'>
    <div className='sidenav-header-inner text-center'>
        <img alt='person' src='./assest/timg.jpg' className='img-fluid rounded-circle mCS_img_loaded'></img>
        <h2 className='h5'>{adname==''?'瞧不起我胖虎?':adname}</h2>
        <span>大雄,静香是我的</span>
    </div>
</div>)
}
export default Panhu;