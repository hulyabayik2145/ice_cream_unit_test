import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";

const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
};
//prop olarak veri alan bir bileşeni test ediyorsak aldığı propların benzerini göndermemiz gerek
test("Miktar,başlık ve fotograf gelen veriye göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={() => {}}
      clearFromBasket={() => {}}
    />
  );

  // miktar spanını çağır
  const amount = screen.getByTestId("amount");
  //miktarın 5 mi kontrol et
  expect(amount.textContent).toBe("5");

  //choclate yazısı ekrana basıldımı?
  screen.getByText("Chocolate");
  // resim elementini al
  const image = screen.getByAltText("cesit-resim");
  // içerisinde src değeri "/images/chocolate.png" olan resim var mı?
  expect(image).toHaveAttribute("src", item.imagePath);
});

test("Butonlara tıklanınca fonksiyonlar doğru parametreler ile çalışır", async () => {
  //userEvent kurulumu
  const user = userEvent.setup();
  //prop olarak scoops bileşeninde gönderilen orjinal fonksiyonları gönderemiyeceğimizden  fonksiyonlar doğru
  // şekilde doğpru zamanda doğru parametreler ile çalışıyor mu kontrolünü yapabilmek için asıl fonksiyonları taklit eden mock fonksiyonunu tanımlamak gerekir

  const addMockFn = jest.fn();
  const clearMockFn = jest.fn();
  render(
    <Card
      item={item}
      amount={3}
      addToBasket={addMockFn}
      clearFromBasket={clearMockFn}
    />
  );

  //butonları al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const clearBtn = screen.getByRole("button", { name: /sıfırla/i });
  // ekle butonuna tıkla
  await user.click(addBtn);
  // addToBasket fonk. doğru parametreleri alarak çalıştır mı
  expect(addMockFn).toHaveBeenCalledWith(item);
  // sıfırla butonuna tıkla
  await user.click(clearBtn);
  // clearFromBasket fonk. doğru parametreleri alarak çalıştır mı
  expect(clearMockFn).toHaveBeenCalledWith("Chocolate");
});
