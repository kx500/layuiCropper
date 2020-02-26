# layuiCropper
用于layui的图片剪切扩展


使用方法：

1、将layuiCropper下载后复制到layui/examples目录下

2、script中调用方法示例：

layui.config({
    base: '/layui/examples/layuiCropper/' //examples为自定义layui组件目录，如果没有可以自行创建
}),
layui.use(['admin', 'layuiCropper'], function(){
    
    var formData = new FormData();
		
    /*
    var options = {
        elem: '#layuiadmin-upload-useradmin',
			  autoCropArea: .1,
			  aspectRatio: 1/1,
			  highlight: false,
			  viewMode: 1,
		  	dragMode: 'move',
			  minCropBoxWidth: 240,
			  minCropBoxHeight: 240,
			  cropBoxMovable: false,
			  cropBoxResizable: false,
			  toggleDragModeOnDblclick: false,
			  done: function(result){
				    console.log(formData, result);
				    formData.append('file', result.blob, result.filename);
			  }
    };
    layui.layuiCropper.render(options);
    */
    
    layui.layuiCropper.render({
          elem: '#layuiadmin-upload-useradmin',
			    done: function(result){ 
				      console.log(result);
				      formData.append('file', result.blob, result.filename);
			    }
     });
});

3、参数设置

options = {
    elem 文件选择器ID
    imgWidth 返回blob宽度
    imgHeight: 返回blob高度
    done 剪切完成回调函数,返回一个对象 { blob, filename }
    ... 其余参数和 Cropper.js 参数设置一样，请参考 https://github.com/fengyuanchen/cropperjs#options
}


