# Báo cáo thực tập ngày 5 (How to test React App with Jest and React Tesing Libary)

Để clone project từ Github, mở terminal và chạy lệnh dưới đây

```git
git clone https://github.com/do-community/doggy-directory
```

Di chuyển vào thư mục doggy-directory

```
cd doggy-directory
```

Cài dặt các thư viện cần thiết

```npm
npm install
```

Chạy project dưới local

```npm
npm start
```

## Testing với Jest

Theo mặc định, Jest sẽ tìm kiếm các tệp có hậu tố .test.js và các tệp có hậu tố .js trong thư mục **tests**. Khi ta thực hiện thay đổi đối với các tệp kiểm tra có liên quan, chúng sẽ được phát hiện tự động. Khi các trường hợp thử nghiệm được sửa đổi, đầu ra sẽ tự động cập nhật. Tệp thử nghiệm được chuẩn bị cho dự án mẫu thư mục doggy được thiết lập với mã tối thiểu trước khi bạn thêm mô hình thử nghiệm. Trong bước này, bạn sẽ viết bài kiểm tra để xác minh rằng trang đích của ứng dụng sẽ tải trước khi thực hiện tìm kiếm.

```ts
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the landing page", () => {
  render(<App />);
});
```

Cần có tối thiểu một khối kiểm tra trong mỗi tệp kiểm tra. Mỗi khối kiểm tra chấp nhận hai tham số bắt buộc: đối số đầu tiên là một chuỗi biểu thị tên của trường hợp kiểm thử; đối số thứ hai là một hàm chứa các kỳ vọng của bài kiểm tra.

Bên trong hàm, có một phương thức kết xuất mà Thư viện thử nghiệm React cung cấp để kết xuất thành phần của bạn vào DOM. Với thành phần mà bạn muốn kiểm tra được hiển thị trong DOM của môi trường kiểm tra, giờ đây bạn có thể bắt đầu viết mã để xác nhận chức năng dự kiến.

Bạn sẽ thêm một khối kiểm tra vào phương thức kết xuất để kiểm tra xem trang đích có hiển thị chính xác hay không trước khi thực hiện bất kỳ lệnh gọi hoặc lựa chọn API nào. Thêm mã được đánh dấu bên dưới phương thức kết xuất:

```ts
...
test('renders the landing page', () => {
  render(<App />);

  expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  expect(screen.getByRole("img")).toBeInTheDocument();
});
```

Hàm mong đợi được sử dụng mỗi khi bạn muốn xác minh một kết quả nhất định và nó chấp nhận một đối số duy nhất biểu thị giá trị mà mã của bạn tạo ra. Hầu hết các hàm mong đợi được ghép nối với hàm so khớp để xác nhận điều gì đó về một giá trị cụ thể. Đối với hầu hết các xác nhận này, bạn sẽ sử dụng các công cụ so khớp bổ sung do jest-dom cung cấp để giúp kiểm tra các khía cạnh chung được tìm thấy trong DOM dễ dàng hơn. Ví dụ: `.toHaveTextContent` là công cụ so khớp cho hàm mong đợi ở dòng đầu tiên, trong khi `getByRole("heading")` là công cụ chọn để lấy phần tử DOM.

Thư viện thử nghiệm React cung cấp đối tượng màn hình như một cách thuận tiện để truy cập các truy vấn thích hợp cần thiết để xác nhận đối với môi trường DOM thử nghiệm. Theo mặc định, Thư viện thử nghiệm React cung cấp các truy vấn cho phép bạn định vị các phần tử trong DOM. Có ba loại truy vấn chính:

- getBy\* (được sử dụng phổ biến nhất)
- queryBy\* (được sử dụng khi kiểm tra sự vắng mặt của một phần tử mà không đưa ra lỗi)
- findBy\* (được sử dụng khi kiểm tra mã không đồng bộ)

Mỗi loại truy vấn phục vụ một mục đích cụ thể sẽ được xác định sau trong hướng dẫn. Trong bước này, bạn sẽ tập trung vào truy vấn getBy\*, đây là loại truy vấn phổ biến nhất. Để xem danh sách đầy đủ các biến thể truy vấn khác nhau, bạn có thể xem lại bảng tóm tắt truy vấn của React [query cheatsheet.](https://testing-library.com/docs/react-testing-library/cheatsheet#queries).

Dưới đây là hình ảnh có chú thích của trang đích Doggy Directory cho biết từng phần mà thử nghiệm đầu tiên (khi hiển thị trang đích) bao gồm:

![default-view-annotated](https://github.com/quocbinh-npm9081/F1VRILLAR-/assets/68917523/6cbc87c9-13f7-4666-adb2-a53c1d2549d8)

Mỗi hàm mong đợi đang xác nhận các điều sau (hiển thị trong hình ảnh chú thích ở trên):

Bạn mong đợi phần tử có vai trò tiêu đề phải khớp với chuỗi con của Doggy Directory.
Bạn mong muốn đầu vào chọn có giá trị hiển thị chính xác là Chọn giống.
Bạn mong đợi nút Tìm kiếm sẽ bị tắt do chưa thực hiện lựa chọn.
Bạn mong đợi hình ảnh giữ chỗ sẽ xuất hiện trong tài liệu vì việc tìm kiếm chưa diễn ra.
Khi hoàn tất, hãy lưu tệp src/App.test.js. Vì các bài kiểm tra đang chạy ở chế độ đồng hồ nên các thay đổi sẽ tự động được đăng ký. Nếu các thay đổi không được đăng ký tự động, bạn có thể cần phải dừng và khởi động lại bộ thử nghiệm.

Bây giờ, khi bạn xem các thử nghiệm của mình trong thiết bị đầu cuối, bạn sẽ thấy kết quả đầu ra sau:

```ts
Output
 PASS  src/App.test.js
  ✓ renders the landing page (172 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.595 s, estimated 5 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

## Mocking the mothod

Trong bước này, bạn sẽ xem xét một cách tiếp cận để mô phỏng phương thức tìm nạp của JavaScript. Mặc dù có nhiều cách để đạt được điều này nhưng việc triển khai này sẽ sử dụng các phương thức [spyOn](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) và [mockImplementation](https://jestjs.io/docs/es6-class-mocks#replacing-the-mock-using-mockimplementation-or-mockimplementationonce) của Jest.

Khi bạn dựa vào các API bên ngoài, có khả năng API của họ sẽ ngừng hoạt động hoặc mất một thời gian để trả về phản hồi. Việc mô phỏng phương thức tìm nạp cung cấp một môi trường nhất quán và có thể dự đoán được, giúp bạn tự tin hơn trong các thử nghiệm của mình. Cơ chế mô phỏng API là cần thiết để chạy thử nghiệm sử dụng API bên ngoài đúng cách.

Mở src/mocks/mockFetch.js trong trình chỉnh sửa của bạn để xem lại cách hoạt động của phương thức mockFetch:

```js
const breedsListResponse = {
  message: {
    boxer: [],
    cattledog: [],
    dalmatian: [],
    husky: [],
  },
};

const dogImagesResponse = {
  message: [
    "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg ",
    "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
  ],
};

export default async function mockFetch(url) {
  switch (url) {
    case "https://dog.ceo/api/breeds/list/all": {
      return {
        ok: true,
        status: 200,
        json: async () => breedsListResponse,
      };
    }
    case "https://dog.ceo/api/breed/husky/images":
    case "https://dog.ceo/api/breed/cattledog/images": {
      return {
        ok: true,
        status: 200,
        json: async () => dogImagesResponse,
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}
```

Phương thức mockFetch trả về một đối tượng gần giống với cấu trúc của lệnh gọi tìm nạp sẽ trả về để phản hồi các lệnh gọi API trong ứng dụng. Phương pháp mockFetch là cần thiết để kiểm tra chức năng không đồng bộ trên hai khu vực của ứng dụng Doggy Directory: danh sách thả xuống chọn lọc để điền danh sách các giống và lệnh gọi API để truy xuất hình ảnh chó khi thực hiện tìm kiếm.

Đóng src/mocks/mockFetch.js. Bây giờ bạn đã hiểu cách sử dụng phương thức mockFetch trong các thử nghiệm của mình, bạn có thể nhập nó vào tệp thử nghiệm của mình. Hàm mockFetch sẽ được chuyển vào làm đối số cho phương thức mockImplementation và sau đó sẽ được sử dụng làm phương thức triển khai giả của API tìm nạp.

Trong src/App.test.js, thêm các dòng mã được đánh dấu để nhập phương thức mockFetch:

```ts
import { render, screen } from '@testing-library/react';
import mockFetch from "./mocks/mockFetch";
import App from './App';

beforeEach(() => {
   jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
   jest.restoreAllMocks()
});
...
```

Mã này sẽ thiết lập và phá bỏ quá trình triển khai mô phỏng để mỗi bài kiểm tra bắt đầu từ một sân chơi bình đẳng.

`jest.spyOn(window, "tìm nạp")`; tạo một hàm mô phỏng sẽ theo dõi các lệnh gọi đến phương thức tìm nạp được gắn vào biến cửa sổ chung trong DOM.

.mockImplementation(mockFetch); chấp nhận một hàm sẽ được sử dụng để triển khai phương thức mô phỏng. Vì lệnh này ghi đè quá trình triển khai tìm nạp ban đầu nên lệnh này sẽ chạy bất cứ khi nào lệnh tìm nạp được gọi trong mã ứng dụng.

Khi hoàn tất, hãy lưu tệp src/App.test.js.

Bây giờ, khi bạn xem các bài kiểm tra của mình trong thiết bị đầu cuối, bạn sẽ nhận được kết quả đầu ra sau:

```
Output
  console.error
    Warning: An update to App inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped into act(...):

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
        at App (/home/sammy/doggy-directory/src/App.js:5:31)

      18 |       })
      19 |       .then((json) => {
    > 20 |         setBreeds(Object.keys(json.message));
         |         ^
      21 |       });
      22 |   }, []);
      23 |
 ...

 PASS  src/App.test.js
  ✓ renders the landing page (429 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.178 s, estimated 2 s
Ran all test suites related to changed files.
```

Cảnh báo cho bạn biết rằng bản cập nhật trạng thái đã xảy ra vào thời điểm không mong đợi. Tuy nhiên, đầu ra cũng chỉ ra rằng các thử nghiệm đã mô phỏng thành công phương thức tìm nạp.

Trong bước này, bạn mô phỏng phương thức tìm nạp và kết hợp phương thức đó vào bộ thử nghiệm. Mặc dù bài kiểm tra đã vượt qua nhưng bạn vẫn cần giải quyết cảnh báo.

## Fix the warning

In this step, you will learn how to fix the `act` warning that surfaced after the changes in Step 3.

The act warning occurs because you have mocked out the `fetch` method, and when the component mounts, it makes an API call to grab the list of breeds. The breeds list is stored in a state variable that populates the `option` element within the select input.

Cảnh báo được đưa ra do trạng thái được đặt sau khi khối kiểm tra kết thúc hiển thị thành phần.

Để khắc phục sự cố này, hãy thêm các sửa đổi được đánh dấu vào trường hợp thử nghiệm trong `src/App.test.js`

```js
...
test('renders the landing page', async () => {
   render(<App />);

   expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
   expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
   expect(await screen.findByRole("option", { name: "husky"})).toBeInTheDocument();
   expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
   expect(screen.getByRole("img")).toBeInTheDocument();
});
```

Từ khóa async cho Jest biết rằng mã không đồng bộ chạy do lệnh gọi API xảy ra khi thành phần được gắn kết.

Một xác nhận mới với truy vấn findBy xác minh rằng tài liệu có chứa tùy chọn có giá trị husky. Truy vấn findBy được sử dụng khi bạn cần kiểm tra mã không đồng bộ phụ thuộc vào thứ gì đó có trong DOM sau một khoảng thời gian. Vì truy vấn findBy trả về một lời hứa sẽ được giải quyết khi tìm thấy phần tử được yêu cầu trong DOM nên từ khóa chờ đợi được sử dụng trong phương thức mong đợi.

Khi hoàn tất, hãy lưu các thay đổi được thực hiện trong src/App.test.js.

Với các bổ sung mới, giờ đây bạn sẽ thấy cảnh báo hành động không còn xuất hiện trong các thử nghiệm của mình:

```
Output
 PASS  src/App.test.js
  ✓ renders the landing page (123 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.942 s, estimated 2 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

Trong bước này, bạn đã tìm hiểu cách khắc phục cảnh báo hành động có thể xảy ra khi làm việc với mã không đồng bộ. Tiếp theo, bạn sẽ thêm trường hợp thử nghiệm thứ hai để xác minh các chức năng tương tác của ứng dụng Doggy Directory.

# Testing Search Testing

Bước cuối cùng, bạn sẽ viết một test case mới để xác minh tính năng tìm kiếm và hiển thị hình ảnh. Bạn sẽ tận dụng nhiều truy vấn và phương pháp API khác nhau để đạt được phạm vi kiểm tra thích hợp.

Quay lại tệp `src/App.test.js` trong trình chỉnh sửa của bạn. Ở đầu tệp, hãy nhập thư viện đồng hành sự kiện [user-event](https://testing-library.com/docs/ecosystem-user-event/) và phương thức không đồng bộ `waitForElementToBeRemoved` vào tệp thử nghiệm với các lệnh được đánh dấu:

```
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';import userEvent from '@testing-library/user-event';
...
```

Bạn sẽ sử dụng những lần nhập này sau trong phần này.

Sau phương thức test() ban đầu, hãy thêm khối kiểm tra không đồng bộ mới và hiển thị thành phần Ứng dụng với khối mã sau:

```js
...
test("should be able to search and display dog image results", async () => {
   render(<App />);
})
```

Với thành phần được kết xuất, giờ đây bạn có thể thêm các chức năng xác minh các tính năng tương tác của ứng dụng Doggy Directory.

Vẫn trong `src/App.test.js`, hãy thêm các khối mã được đánh dấu trong phương thức test() thứ hai:

```js
...
test("should be able to search and display dog image results", async () => {
   render(<App />);

   //Simulate selecting an option and verifying its value
   const select = screen.getByRole("combobox");
   expect(await screen.findByRole("option", { name: "cattledog"})).toBeInTheDocument();
   userEvent.selectOptions(select, "cattledog");
   expect(select).toHaveValue("cattledog");
})
```

Phần được đánh dấu ở trên sẽ mô phỏng việc lựa chọn giống chó và xác minh rằng giá trị chính xác được hiển thị.

Truy vấn `getByRole` lấy phần tử đã chọn và gán nó cho biến chọn.

Tương tự như cách bạn khắc phục cảnh báo `act` ở Bước 4, hãy sử dụng truy vấn `findByRole` để đợi tùy chọn `cattledog` xuất hiện trong tài liệu trước khi tiếp tục các xác nhận tiếp theo.

Đối tượng `userEvent` được nhập trước đó sẽ mô phỏng các tương tác thông thường của người dùng. Trong ví dụ này, phương thức selectOptions sẽ chọn tùy chọn cowdog mà bạn đã đợi ở dòng trước.

Dòng cuối cùng xác nhận rằng biến chọn chứa giá trị `cattledog` đã chọn ở trên.

Phần tiếp theo mà bạn sẽ thêm vào khối Javascript test() sẽ bắt đầu yêu cầu tìm kiếm để tìm hình ảnh con chó dựa trên giống đã chọn và xác nhận sự hiện diện của trạng thái tải.

Thêm các dòng được đánh dấu:

```js
...
test("should be able to search and display dog image results", async () => {
   render(<App />);

   //...Simulate selecting an option and verifying its value

  //Simulate initiating the search request
   const searchBtn = screen.getByRole("button", { name: "Search" });
   expect(searchBtn).not.toBeDisabled();
   userEvent.click(searchBtn);

   //Loading state displays and gets removed once results are displayed
   await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));
})
```

Truy vấn `getByRole` định vị nút tìm kiếm và gán nó cho biến `searchBtn`.

Trình so khớp jest-dom `toBeDisabled`` sẽ xác minh rằng nút tìm kiếm không bị tắt khi thực hiện lựa chọn giống.

Phương thức `click` trên đối tượng `userEvent` mô phỏng việc nhấp vào nút tìm kiếm.
Hàm trợ giúp không đồng bộ `WaitForElementToBeRemoved` được nhập trước đó sẽ đợi sự xuất hiện và biến mất của thông báo Loading trong khi lệnh gọi API tìm kiếm đang được thực hiện. queryByText trong lệnh gọi lại `waitForElementToBeRemoved` sẽ kiểm tra sự vắng mặt của một phần tử mà không đưa ra lỗi.

Hình ảnh bên dưới hiển thị trạng thái tải sẽ được hiển thị khi tiến hành tìm kiếm:

<img width="905" alt="loading-view" src="https://github.com/quocbinh-npm9081/F1VRILLAR-/assets/68917523/ab4aefc7-5e91-43e4-aafe-64bee6483c11">

Tiếp theo, thêm mã Javascript sau để xác thực hiển thị hình ảnh và kết quả:

```js
...
test("should be able to search and display dog image results", async () => {
   render(<App />)

   //...Simulate selecting an option and verifying its value
   //...Simulate initiating the search request
   //...Loading state displays and gets removed once results are displayed

   //Verify image display and results count
   const dogImages = screen.getAllByRole("img");
   expect(dogImages).toHaveLength(2);
   expect(screen.getByText(/2 Results/i)).toBeInTheDocument();
   expect(dogImages[0]).toHaveAccessibleName("cattledog 1 of 2");
   expect(dogImages[1]).toHaveAccessibleName("cattledog 2 of 2");
})
```

Truy vấn ` getAllByRole`` sẽ chọn tất cả hình ảnh con chó và gán chúng cho biến  `dogImages`. Biến thể *AllBy* của truy vấn trả về một mảng chứa nhiều phần tử khớp với vai trò đã chỉ định. Biến thể *AllBy* khác với biến thể `ByRole`, biến thể này chỉ có thể trả về một phần tử duy nhất.

Quá trình triển khai tìm nạp mô phỏng chứa hai URL hình ảnh trong phản hồi. Với công cụ so khớp `toHaveLength` của Jest, bạn có thể xác minh rằng có hai hình ảnh được hiển thị.

Truy vấn `getByText` sẽ kiểm tra xem số kết quả phù hợp có xuất hiện ở góc bên phải hay không.

Hai xác nhận sử dụng trình so khớp `toHaveAccessibleName` xác minh rằng văn bản thay thế thích hợp được liên kết với từng hình ảnh.

```
Output
 PASS  src/App.test.js
  ✓ renders the landing page (273 ms)
  ✓ should be able to search and display dog image results (123 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        4.916 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```
