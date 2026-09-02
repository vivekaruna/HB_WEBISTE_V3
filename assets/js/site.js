document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {

    navToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "nav-open",
        isOpen
      );

    });


    nav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "nav-open"
        );

      });

    });

  }


  /* =======================================================
     FILE INPUT DISPLAY
     ======================================================= */

  const drawingInput =
    document.querySelector("#drawing");

  const fileWrapper =
    document.querySelector(".file-input-wrapper");

  const fileCopy =
    document.querySelector(".file-input-copy");

  if (
    drawingInput &&
    fileWrapper &&
    fileCopy
  ) {

    drawingInput.addEventListener(
      "change",
      () => {

        const file =
          drawingInput.files?.[0];

        if (!file) {
          return;
        }

        fileWrapper.classList.add(
          "has-file"
        );

        fileCopy.innerHTML = `
          <strong>${escapeHtml(file.name)}</strong>
          <small>
            File selected — choose another file to replace it
          </small>
        `;

      }
    );

  }


  /* =======================================================
     RFQ FORM
     ======================================================= */

  const form =
    document.querySelector("#rfq-form");

  const status =
    document.querySelector(".form-status");

  if (form && status) {

    form.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        const action =
          form.getAttribute("action");

        if (!action) {

          showStatus(
            status,
            "Unable to submit the requirement. Please try again.",
            "error"
          );

          return;
        }


        const submitButton =
          form.querySelector(
            'button[type="submit"]'
          );

        const originalText =
          submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
          "Sending Requirement...";


        try {

          const formData =
            new FormData(form);

          const response =
            await fetch(
              action,
              {
                method: "POST",
                body: formData,
                headers: {
                  Accept:
                    "application/json"
                }
              }
            );


          if (!response.ok) {
            throw new Error(
              "Submission failed"
            );
          }


          form.reset();

          fileWrapper?.classList.remove(
            "has-file"
          );

          if (fileCopy) {

            fileCopy.innerHTML = `
              <strong>
                Choose drawing or CAD file
              </strong>

              <small>
                PDF, STEP, STP, IGES, IGS,
                DWG, DXF or ZIP
              </small>
            `;

          }


          showStatus(
            status,
            "Thank you. Your requirement has been submitted successfully.",
            "success"
          );


        } catch (error) {

          console.error(error);

          showStatus(
            status,
            "We could not submit your requirement. Please try again or email enquiry@hillboyengineering.com.",
            "error"
          );

        } finally {

          submitButton.disabled = false;

          submitButton.innerHTML =
            originalText;

        }

      }
    );

  }


  /* =======================================================
     HELPERS
     ======================================================= */

  function showStatus(
    element,
    message,
    type
  ) {

    element.textContent =
      message;

    element.className =
      `form-status is-visible ${type}`;

  }


  function escapeHtml(value) {

    const div =
      document.createElement("div");

    div.textContent =
      value;

    return div.innerHTML;

  }

});