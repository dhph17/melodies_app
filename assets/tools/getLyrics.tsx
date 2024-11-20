const getLyrics = (trackTitle: string): string => {
    // Define a mapping of track titles to lyrics
    const lyricsMap: Record<string, string> = {
        "Nàng Thơ": `
Em, ngày em đánh rơi nụ cười vào anh
Có nghĩ sau này em sẽ chờ
Và vô tư cho đi hết những ngây thơ
Anh, một người hát mãi những điều mong manh
Lang thang tìm niềm vui đã lỡ
Chẳng buồn dặn lòng quên hết những chơ vơ
Ta yêu nhau bằng nỗi nhớ chưa khô trên những bức thư
Ta đâu bao giờ có lỗi khi không nghe tim chối từ
Chỉ tiếc rằng
Em không là nàng thơ
Anh cũng không còn là nhạc sĩ mộng mơ
Tình này nhẹ như gió
Lại trĩu lên tim ta những vết hằn
Tiếng yêu này mỏng manh
Giờ tan vỡ, thôi cũng đành
Xếp riêng những ngày tháng hồn nhiên
Trả lại...
Mai, rồi em sẽ quên ngày mình khờ dại
Mong em kỷ niệm này cất lại
Mong em ngày buồn thôi ướt đẫm trên vai
Mai, ngày em sải bước bên đời thênh thang
Chỉ cần một điều em hãy nhớ
Có một người từng yêu em tha thiết vô bờ
Em không là nàng thơ
Anh cũng không còn là nhạc sĩ mộng mơ
Tình này nhẹ như gió
Lại trĩu lên tim ta những vết hằn
Tiếng yêu này mỏng manh
Giờ tan vỡ, thôi cũng đành
Xếp riêng những ngày tháng hồn nhiên
Trả hết cho em
Em không là nàng thơ
Anh cũng không còn là nhạc sĩ mộng mơ
Tình này nhẹ như gió
Lại trĩu lên tim ta những vết hằn
Tiếng yêu này mỏng manh
Giờ tan vỡ, thôi cũng đành
Xếp riêng những ngày tháng hồn nhiên
Trả hết cho em
        `,
        "Trở Về": `
Con đã lớn lên ở trên nôi, ở trên nôi mẹ

Nghe tiếng hát ru ca ối a

Con đã lớn lên nơi mưa giông, nơi mưa giông

Đủ biết từng điều mẹ đã mãi cho đi

Mẹ uống nước lã, uống nước lã để phần con thịt cá

Càng đi để tự mình thấy nhỏ bé với những thứ mình đã trải qua

Và giấu đi chỉ để đổi lấy lời nói dối con nghe

Có những lúc phải đi xa, nhưng mà con chỉ muốn được trở về

Có những lúc nghĩ sẽ buông xuôi, nhưng mà con lại nhớ về bố mẹ

Nhớ giọng bố gọi con là cún ơi vang tận ra ngoài ngõ

Nhớ bàn tay của mẹ vẫn chở che, vẫn hay thường vỗ về

Đòi mẹ sắm cho bộ loa, bảo là con thích được nghe nhạc

Đòi bố mua cho 2 anh em cặp xe, vì bọn con rất thích đạp xe đạp

Dù chẳng đáp ứng được hết nhưng bố vẫn luôn trìu mến và nhẹ nhàng

Nắng gió vẫn đón đưa mặc cho mẹ đã bị trễ làm

Nhìn vào mắt bố con đã thấy những giọt nước mắt giấu trong bẽ bàng

Nhìn vào mắt mẹ con đã thấy những giấc mơ đang trôi qua thật khẽ khàng

Mọi thứ vốn bình yên, nhưng rồi ai mà biết nó lại rẽ làn

Con chỉ muốn trả lại thanh xuân cho bố mẹ, dù biết điều này chẳng dễ dàng

Và con sẽ bước tiếp dù biết phía trước nó sẽ chẳng dễ dàng

Chỉ cần bố mẹ yên lòng thôi bất cứ điều gì con cũng sẽ làm

Tất cả những đàm tiếu về ta gom luôn vào đây con xé toạc

Dù biết là sẽ chẳng dễ dàng nhưng vì bố mẹ con zai sẽ làm

Con sẽ làm

Con sẽ làm

Con sẽ làm

Đáp xuống nội bài, trong vali con là đống quà

Rót chén nước, thắp nén hương, thằng cu cháu mời các cụ về thăm nhà

Năm tháng trôi qua để lại những nếp nhăn trên tay của ông bà

Nhớ nồi bánh chưng mỗi dịp tết, và nhớ cái vị của cơm cà

Nhớ mấy cây phong lan ông bố hay ngắm nghía ở sân nhà

Nhớ mấy đứa em ngoan, vẫn còn ngây ngô giờ đều đã lớn cả

Dù có đi xa, khi trở về nhà, thì vẫn cứ phải là vâng dạ

Có đi xa, khi trở về nhà, thì vẫn cứ phải là vâng dạ

Trăng sáng nên hôm nay, con lại viết tiếp thêm 1 bài

Mong rằng có thể xua tan đi hết bao muộn phiền

Chăm sóc con từng ngày, để giờ con cất cánh tung bay

Vẫn về đây dù cho con kiếm cả bộn tiền

Đã có lúc thất bại chẳng thể nào khiến con lung lay

Con còn phải tập trung xử lý nốt mấy đầu việc

Và những nghĩ suy này lại làm từng dòng thơ cứ thế một dài

Con lại thu vào mic tựa như những lời cầu nguyện

Có những lúc phải đi xa, nhưng mà con chỉ muốn được trở về

Có những lúc nghĩ sẽ buông xuôi, nhưng mà con lại nhớ về bố mẹ

Có những lúc phải đi xa, nhưng mà con chỉ muốn được trở về

Có những lúc nghĩ sẽ buông xuôi, nhưng mà con lại nhớ về bố mẹ

Cho con, cho con, cho con cả cuộc đời đằng sau lời nói dối kia

Mẹ đã cho con, cho con, cho con, cho con

Đi về nơi đâu để trở lại đây

Cho con, cho con, cho con cả cuộc đời đằng sau lời nói dối kia

Mẹ đã cho con, cho con, cho con, cho con.
        `,
        "Tim Anh Ghen": `
[Lời bài hát "Tim Anh Ghen" bởi WXRDIE]

[Intro]
(Rev [?])
Yeah yeah, yeah yeah

[Chorus: WXRDIE]
Bởi vì nguyên team anh gang gang
Bởi vì nguyên team anh gang gang
Bọn anh on the same lane
Xuyên qua màn đêm đen, follow game plan
Ice chain leng keng
Đồng hồ trên tay anh trông như Ben 10
Countin' up like 10 bands mỗi khi mà trap phone anh kêu reng reng

Thêm bạn thêm thù thêm anh thêm em
Thêm tiền thêm đồ, anti social
Thêm fan thêm fame
Mấy con chó lại khép na khép nép
Khi chạm mặt tao lại bẽn la bẽn lẽn
Em yêu trông lem nha lem nhem
Bắn phát vào đầu em la lên "Damn"

[Verse 1: WXRDIE]
Bước vào làm cho nó sập luôn
Đưa tao beat với mic tao sẽ phập luôn
Now I only fuck with nhập thôi
Nên I told my P có gì mới cứ nhập luôn
Từ khi flow mới còn tập tuôn
Giờ bước tới đâu chỗ đấy ngập luôn
Big racks tao muốn nhét đống này vào túi đến khi nào nó chật luôn
Khuyên mấy đứa em là nếu muốn rap giống anh
Là phải động não sáng tạo chứ đừng có mà rập khuôn
Khuyên mấy đứa em là
Nếu muốn tạo ra giá trị thặng dư thì hãy tập buôn
Bảo chúng nó là muốn đầu óc thanh thản thì đâu tiên là hãy tập buông
Bảo chúng nó là kiếm bánh về thì hãy nhớ chia
Chứ đừng có mà tợp luôn
Từng ở trong trap
Giờ tao bước ra ngoài ánh sáng
I came from nothing, chẳng có gì
Giờ thì bọn tao đã khác
I'm with my squad, fuck the opps
Go straight to the top
Tà đạo gian ác
Nó khao khát linh hồn nảy chỉ đợi tao rao bán
Trải dài từ Bắc, vào tận Nam
I'm stackin' my guap
Nhìn bọn nó rap, tao chỉ ngáp
Cuz' I know it's all cap
Từ vài tờ giấy nháp, giờ đổi ra, 24 Karat
Puff puff xong pass, bật to loa
Rồi lại ngồi cười haha

[Chorus: WXRDIE]
Bởi vì nguyên team anh gang gang
Bởi vì nguyên team anh gang gang
Bọn anh on the same lane
Xuyên qua màn đêm đen, follow game plan
Ice chain leng keng
Đồng hồ trên tay anh trông như Ben 10
Countin' up like 10 bands mỗi khi mà trap phone anh kêu reng reng

Thêm bạn thêm thù thêm anh thêm em
Thêm tiền thêm đồ, anti social
Thêm fan thêm fame
Mấy con chó lại khép na khép nép
Khi chạm mặt tao lại bẽn la bẽn lẽn
Em yêu trông lem nha lem nhem
Bắn phát vào đầu em la lên "Damn"

[Verse 2: LVK]
Nhấm nháp trong stu vài lon
Và nghe beat rồi anh pick vài con
Anh biết anh biết là mình stone
Ngồi cùng với TYDE thu hit lại ngon
No cap, anh chưa có muốn đáp
Get da bag ASAP, I'm on my zone
May mắn là từ đôi bàn tay trắng
Để mà đến được đây anh đã phải mài mòn
Bọn họ đang xem
Và anh biết là bọn họ đang xem
Lấy về miếng to, chia cho anh em
Cuộc sống và giá trị tăng thêm
Big drip, thủ đô và thành phố
Trap life tụi anh đang lên
Xuống phố anh đi cùng với whole squad
Uy tín luôn đặt bên trên
Wow, đồ anh nhét đầy balo
Bước vào trap house tụi anh chơi giải ngố
No, I don't fuck with this hoes
Follow game flans gia tăng mấy con số
Yeah, anh muốn hip hop on top
Drop big hit khi tụi anh link up
Đéo có lí do quan tâm bọn opps
Anh lại vào việc hustle non-stop
Push up lên cơ lên cơ
Anh đâu có muốn lãng phí thì giờ
Lock in như là sợi dây chuyền
Tụi anh đã làm khi em vẫn ngồi ngơ
Thêm tiền thêm phiền thêm chuyện
Quá nhiều vấn đề anh không thể làm lơ (Nope, shit!)
Thực hiện hết những cái thứ này, anh đéo nhởn nhơ

[Verse 3: TeuYungBoy & LVK]
Bọn opps này đừng dại va tao
Kết cục ra sao? Blood on my hands
Mấy thằng cu ý kiến ý cò đừng có chối
Wanna join my gang
Slide by drive through
Em tao sấy draco nhất đẳng đai đen
Loại mày đâu có anh quen ai khen
My fan nhảy top top ngay trên Highland

[Verse 4: Dangrangto & TeuYungBoy]
Và lại trap trap with da gang gang
Bọn tao đã all in từ hồi chưa tuyên dương
Ông trời không cho tao sung sướng
Bắt tao phải đi bươn, để tao không lạc đường
Cố gắng mãi để dắt mũi
Tao chỉ thấy mày ngoe nguẩy y như 1 con lươn
Phải ngoan đi biết điều còn được anh thương
Còn nếu mà hơi ương thì thấp cho mày nhang hương
        `,
    };

    // Return the corresponding lyrics or a default message
    return lyricsMap[trackTitle] || "Lyrics not available for this song.";
};

export default getLyrics;