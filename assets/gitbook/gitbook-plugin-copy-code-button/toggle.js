require(["gitbook", "jquery"], function (gitbook, $) {
  function selectElementText(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  }

  function getSelectedText() {
      var t = '';
      if (window.getSelection) {
          t = window.getSelection();
      } else if (document.getSelection) {
          t = document.getSelection();
      } else if (document.selection) {
          t = document.selection.createRange().text;
      }
      return t;
  }

  function copyToClipboard(text) {
      if (window.clipboardData && window.clipboardData.setData) {
          // IE specific code path to prevent textarea being shown while dialog is visible.
          return clipboardData.setData("Text", text);

      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
          var textarea = document.createElement("textarea");
          textarea.textContent = text;
          textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
          document.body.appendChild(textarea);
          textarea.select();
          try {
              return document.execCommand("copy");  // Security exception may be thrown by some browsers.
          } catch (ex) {
              console.warn("Copy to clipboard failed.", ex);
              return false;
          } finally {
              document.body.removeChild(textarea);
          }
      }
  }

  gitbook.events.bind("page.change", function () {
      $("pre").each(function () {
          // Wrap the pre block in a parent container
          var $pre = $(this);
          var $parentWrapper = $("<div class='pre-wrapper'></div>");
          
          // Wrap the pre element first
          $pre.wrap($parentWrapper);

          // Now append the copy button to the parent wrapper
          var $copyCodeButton = $("<div class='copy-code-button'>Copy</div>");
          $pre.parent().append($copyCodeButton); // Add the button to the wrapper

          // Add styles to the wrapper to match the size and positioning of the pre block
          $pre.parent().css({
              position: "relative",
              margin: $pre.css("margin"),
              padding: $pre.css("padding"),
              background: $pre.css("background"),
              border: $pre.css("border"),
              borderRadius: $pre.css("border-radius"),
              overflow: "hidden", // Ensures no content spills out
          });

          // Remove margins and padding from the pre itself to avoid duplication
          $pre.css({
              margin: 0,
              padding: 0,
              border: "none",
              background: "none",
          });

          // Add the copy button to the wrapper
          $copyCodeButton.css({
              padding: "8px 10px",
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "#9da8b3",
              color: "white",
              borderRadius: "5px",
              border: "1px solid #CCCCCC",
              fontSize: "1rem",
              textAlign: "center",
              lineHeight: "0.9rem",
              cursor: "pointer",
              zIndex: 2,
          });

          $copyCodeButton.click(function () {
              var $codeContainer = $pre.parent().find("code");
              if ($codeContainer) {
                  selectElementText($codeContainer.get(0));
                  var selectedText = getSelectedText();

                  var buttonNewText = "";
                  if (copyToClipboard(selectedText) === true) {
                      buttonNewText = "Copied";
                  } else {
                      buttonNewText = "Unable to copy";
                  }

                  $(this).text(buttonNewText);
                  var that = this;
                  setTimeout(function () {
                      $(that).text("Copy");
                  }, 2000);
              }
          });
      });
  });
});
