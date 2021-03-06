<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>JavaScript最終課題:ルーレット</title>
    <link rel="stylesheet" href="roulette.css">
    <script src="jquery-3.5.1.min.js"></script>
    <script>
    var array;
    function arrays () {
        // 配列として空のarrayを定義
        array = [];
        
        // 1~16までの値(i)を繰り返し処理
        for (var i=1; i<=16; i++) {
            array.push(i);// 空の配列arrayにiの値を追加していく
        }
    }
        var num;  // 変数numを定義(グローバルとしてnumの値を共通とする為)
        var interval_id = null;  // startで動かした処理をstopとresetで止めるため
        
        // start_roulette()関数を定義(ルーレットのスタート処理)
        function start_roulette() {
            interval_id = setInterval(show_roulette, 100);  // ルーレットの抽選が100ミリ秒のスピードで行われる処理をinterval_idに代入
            $('#start').prop('disabled', true);  // button id="start"のボタン処理を無効化
            $('#stop').prop('disabled', false);  // button id="stop"のボタン処理の無効化を解除
        }
        
        // stop_roulette()関数を定義(ルーレットのストップ処理)
        function stop_roulette() {
            clearInterval(interval_id);  // start_roulette()関数で100ミリ秒ごとに動いていた抽選処理の停止
            interval_id = null;  // 1度stopをしたときにinterval_idを無効にする
            var number = array[num];  // 変数numberを定義し、arrayの配列の中身を代入
            $('#num' + number).addClass('light_here');  // number(1~16)にClassのlight_hereを適用
            array.splice(num,1);  // stopボタンが押されるたびに1つずつ配列内の値が削除されていく
            console.log(array);  // 補足として:配列内がどのように削除されていくか確認用
            
            $('#start').prop('disabled',false);  // table id="start"の無効化を解除
            if (array.length === 0) {  // array内の配列が0になった場合(すべてのマスが選択された状態) 、以下の処理が行われる
                $('#start').prop('disabled', true);  // button id="start"の無効化
            }
            $('#stop').prop('disabled', true);  // button id="stop"の無効化
        }
        
        // reset_roulette()関数を定義(ルーレットのリセット処理)
        function reset_roulette() {
            clearInterval(interval_id);  // start_rouletteで行われていた繰り返し処理を停止
            interval_id = null;  // reset時の停止したタイマーが無効化
            
            for (i=1; i<=16; i++) {  // for文を定義(1~16の番号の点滅処理と選択された状態を解除する為、ループ処理で引き出す)
                $('#num' + i).removeClass('light_now');  // 番号選択時の色の点滅処理を行うclass="light_now"を解除
                $('#num' + i).removeClass('light_here');  // 番号が選択済みの色の処理を行うclass="light_here"を解除
            }
            
            // array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];  // 選択されて削除されてきた1~16までの数字を初期化するために配列を呼び出す
            $('#start').prop('disabled',false);  // リセット時にbutton id="start"の無効化を解除
            $('#stop').prop('disabled',true);  // リセット時にbutton id="stop"の無効化を解除
            arrays();
        }
        
        // show_roulette()関数を定義(ルーレットの抽選時の処理を行う)
        function show_roulette () {
            $('td').removeClass('light_now');
            num = choice_now();  // choice_now()関数をnumに代入
            console.log(num);  // 補足として:numの動きを見るため
            number = array[num];  // arrayの配列の中身をnumberに代入
            $('#num' + number).addClass('light_now');  // table id="num"にnumber(1~16)を加え、Class="light_now"を適用     
        }
    
        // choice_now()関数を定義(抽選の方法を処理)
        function choice_now() {
            num = Math.floor(Math.random() * array.length);  // Math.floorとMath.randomを利用することで小数点以下を切り捨てしたランダムな整数を取得
            return num;  // 返り値としてnumを返す
        }
        
        // HTMLの読み込み対策として、window.onloadの代わりにjQueryを使用し$(function()を定義
        $(function () {            
            arrays();
            for (i=1; i<=array.length; i++) {  // 1~16までの数字を繰り返し処理
                if (i%4 === 1) {  // trタグを4つに分けるため、if文を定義 iを4で割った時の剰余が1と厳密に等しければ以下の処理が行われる
                    $('#matrix').append('<tr>');  // table id="matrix"にtrタグを追加
                }
                $('tr:last-child').append('<td id="num' + i + '">' + i + '</td>');  // 最後のtrにtd id="num1~16"の値(i)を追加
            }
            
            $('#start').click(start_roulette);  // button id="start"を検索・取得し、clickイベントを監視
            $('#stop').click(stop_roulette);  // button id="stop"を検索・取得し、clickイベントを監視
            $('#reset').click(reset_roulette);  // button id="reset"を検索・取得し、clickイベントを監視
            $('#stop').prop('disabled', true);  // button id="stop"を無効化
        });
    </script>
</head>

<body>
    <!--1~16までのマスの表を作成するためにtableタグを作成-->
    <table id="matrix">
    </table>
    <button id="start">スタート</button>
    <button id="stop">ストップ</button>
    <button id="reset">リセット</button>
</body>

</html>
