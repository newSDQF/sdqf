//获取商品


var typeName = decodeURI(GetQueryString("name"), "utf-8");

  function GetQueryString(name)
  {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
  }


  getList(typeName);

  getType();

  //获取商品
  function getList(name){
   
    $.ajax({
      url:"../goods/getGoods",
      type:"get",
      success:function(data){
        var str="";

        for (var i = 0; i < data.goodsList.length; i++) {
          
             console.log(typeof typeName)
          if(typeName!="null"){

             classStr=(typeName==data.goodsList[i].goodsTypeName?"show":"hide")
          }else{
             classStr="show";
          }
          

          str+='<div class="all-miana '+classStr+'" data-type="'+data.goodsList[i].goodsTypeName+'">'+
              '<div class="all-left" ><img src="../uploads/'+data.goodsList[i].goodsCover+'" alt="" style="width:100%">'+
              '</div>'+
              '<div class="all-right">'+
                '<p>'+data.goodsList[i].goodsName+'</p>'+
                '<p>'+data.goodsList[i].goodsPrice+'</p>'+
                '<p><a class="view goods-detail" href="../goods/getDetail?id='+data.goodsList[i]._id+'"  >view</a></p>'+
                '<p><a  hred="###" class="view go-car" data-goodsid="'+data.goodsList[i]._id+'" onclick="goCar(event)">加入购物车</a></p>'+
              '</div>'+
          '</div>'
        }

        $(".all-mian").html(str);

        if($(".show").length==0){

             $(".all-mian").html("<div class='no-data'>暂时没有商品</div>")
        }




      }

    })

  }

//获取商品类型
function getType(name){
  var  name=name?name:"default";
  $.ajax({
    url:"../goods/type?name="+name,
    type:"get",
    success:function(data){

      var str="";
      if(data.status==0){

        for (var i = 0; i < data.typeList.length; i++) {
          str+="<li class='go-type'><a href='../api/allgoods?name="+encodeURI(encodeURI(data.typeList[i].typeName))+"'>"+data.typeList[i].typeName+"</a>";
        }

        $(".nav").append($(str));


      }


    }


  })


}

function goCar(event){

      var ajaxData={};

      
      ajaxData.goodsId=$(event.target).attr("data-goodsid");
    alert("aaa")
      $.ajax({
        url:"../car/go_car",
        type:"post",
        data:ajaxData,
        success:function(data){

          if(data.status==0){
            $(".logo-c a").addClass("logo-c-active")
            alert(data.msg);
          }else{
             alert(data.msg);
          }
         
        }


      })
    }






