import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import Scoops from '.';
import userEvent from "@testing-library/user-event";


/*
! Seçicicileer -> 3 ana parçadan oluşur
? method [All]By seçici
* method-> get | find | query
* get -> başlangıçta dom da olan elementleri almak için kullanılır |elementi bulamazsa hata verir
* query -> get ile benxer çalışır | elemnt bulunamazsa null döndürür ve test devam eder
* find -> elementin ne zaman ekrana basılacağı belli değilse kullanılır(api isteklerinde)

* not: find metodu ppromise döndürür
* buuuu yüüzden asyn await ile  kullanılmalı
* eğer motoda all eklersek seçicinin kossuluna uyan büttün elementleri alır her zaman dizi şeklinde cevap verir
*/

test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />);
    // const resimler = screen.getByAltText("çeşit-resim");
    // const resimler = screen.queryByAltText("çeşit-resim");

    //ekrana basılan resimleri al
    const images = await screen.findAllByAltText("cesit-resim");
    //console.log("resimler>>>>>>>", images)
    //gelen resimlerin sayısı 1 den büyük veya eşitmi?
    expect(images.length).toBeGreaterThanOrEqual(1);

});


test("Çeşitlerin ekleme ve sıfırlama işlemleri çalışır", async () => {
    //userEvent kurulumu
    const user = userEvent.setup();
    //bileşeni ekrana bas

    render(<Scoops />);

    // bütün ekleme ve sıfırlama butonlarını çağır
    const addButtons = await screen.findAllByRole('button', { name: /ekle/i });
    const delButtons = await screen.findAllByRole('button', { name: /sıfırla/i });
    console.log(delButtons.length);

    // toplam fiyat elementini çağır
    const total = screen.getByTestId('total')

    // toplam fiyat 0 mı  kontrol et
    //expect(total).toHaveTextContent(0);//içerikde  0 varmı  kontrol ediyor,testimizin cevabı karşılanmıyor
    //farklı metod
    //içerik 0 a eşit mi diye kontrol ediyor

    expect(total.textContent).toBe('0');

    // ekle butonlarından birine tıkla
    // fireEvent.click(addButtons[0]);
    await user.click(addButtons[0])


    // toplam fiyat 20 mi kontrol et
    expect(total.textContent).toBe('20');

    // ekle butonlarından birine 2 kez tıkla
    await user.dblClick(addButtons[2]);

    // toplam fiyat 60 mı kontrol et
    expect(total.textContent).toBe('60');

    // ilk elemanı kaldır
    await user.click(delButtons[0]);

    // toplam fiyat 40 mı kontrol et
    expect(total.textContent).toBe('40')

    // son ekleneni kaldır
    await user.click(delButtons[2]);

    // toplam fiyat 0 mı kontrol et
    expect(total.textContent).toBe('0');


})