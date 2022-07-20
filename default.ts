// You can create the HtmlEditor widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

// import DevExpress from "devextreme";

// new DevExpress.ui.dxHtmlEditor(document.getElementById("CloudTextModel"), {
//     height: 800,
//     value: "This is <b>HtmlEditor</b>.<br/>Select text and use a toolbar item."
// });


$(() => {
    const editor = $('.html-editor').dxHtmlEditor({
      height: 725,
      value: "<ul><li id=4>abc</li></ul>",
      imageUpload: {
        tabs: ['file', 'url'],
        fileUploadMode: 'base64',
      },
      toolbar: {
        items: [
          'undo', 'redo', 'separator',
        ],
      },
      mediaResizing: {
        enabled: false,
      },
    }).dxHtmlEditor('instance');
  });
  