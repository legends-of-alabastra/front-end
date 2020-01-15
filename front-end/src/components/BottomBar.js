import React from "react";
import styled from "styled-components";

import MainGame from "../assets/mainGame.wav"

export default class BottomBar extends React.Component {
  render() {
    return (
      <BarView>
          <div>
          <audio loop >
        <source src={MainGame} type="audio/wav" />
      </audio>
            </div>
        <SoundView>
          <SoundImg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0016 12C20.0016 8.67188 17.9672 5.82188 15.0797 4.61719L14.3109 6.46406C16.4766 7.36875 18 9.50625 18 12C18 14.4984 16.4766 16.6313 14.3063 17.5359L15.075 19.3828C17.9672 18.1781 20.0016 15.3281 20.0016 12ZM15.9984 12C15.9984 10.3359 14.9812 8.91094 13.5375 8.31094L12.7687 10.1578C13.4906 10.4578 13.9969 11.1703 13.9969 12.0047C13.9969 12.8344 13.4906 13.5469 12.7687 13.8516L13.5375 15.6984C14.9812 15.0891 15.9984 13.6641 15.9984 12ZM16.6172 0.923438L15.8438 2.77031C19.4578 4.275 21.9984 7.8375 21.9984 12C21.9984 16.1578 19.4578 19.725 15.8438 21.2297L16.6125 23.0766C20.9531 21.2672 24 16.9922 24 12C24 7.00781 20.9531 2.73281 16.6172 0.923438ZM0 6.99844V16.9969H3.99844L11.0016 24V0L3.99844 6.99844H0Z"
                fill="white"
              />
            </svg>
          </SoundImg>
          <SoundText>Sound</SoundText>
        </SoundView>
        <HelpView>
          <HelpImg>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2.33337C7.56704 2.33337 2.33337 7.56704 2.33337 14C2.33337 20.433 7.56704 25.6667 14 25.6667C20.433 25.6667 25.6667 20.433 25.6667 14C25.6667 7.56704 20.433 2.33337 14 2.33337ZM15.1667 21H12.8334V18.6667H15.1667V21ZM16.3054 15.3009C16.0767 15.4852 15.8562 15.6614 15.6812 15.8364C15.2052 16.3112 15.1679 16.7429 15.1667 16.7615V16.9167H12.8334V16.7219C12.8334 16.5842 12.8672 15.3487 14.0304 14.1855C14.2579 13.958 14.5402 13.727 14.8365 13.4867C15.6929 12.7925 16.2552 12.2862 16.2552 11.5885C16.2417 10.9992 15.998 10.4385 15.5763 10.0265C15.1546 9.61452 14.5884 9.38394 13.9989 9.38409C13.4094 9.38424 12.8433 9.61512 12.4218 10.0273C12.0004 10.4395 11.757 11.0003 11.7437 11.5897H9.41037C9.41037 9.05921 11.4695 7.00004 14 7.00004C16.5305 7.00004 18.5897 9.05921 18.5897 11.5897C18.5897 13.4529 17.2142 14.5647 16.3054 15.3009Z"
                fill="white"
              />
            </svg>
          </HelpImg>
          <HelpText>Help</HelpText>
        </HelpView>
        <CurrencyView>
          <CurrencyText>Gold:</CurrencyText>
          <CurrencyText>Stashed:</CurrencyText>
          <svg
            width="64"
            height="16"
            viewBox="0 0 64 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="64" height="16" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use href="#image0" transform="scale(0.015625 0.0625)" />
              </pattern>
              <image
                id="image0"
                width="64"
                height="16"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAB0UlEQVRYR+WXsUoDQRCGJxxqEYVUVlpZC54+gORFokhaUexNiPai2MaAeRHJC3iCtZ2VlaBpDIcye5lznZvdncUmIVeFy/3zz3wzu3tXgwW/ar76z1ur3/j/5fDT+5wrxjzonYVh8hc3W6a2zslLNIR50YsAKPm8fgzJ+DYaAtdjnF77VA2xhNd4KobrfSeqCTH5VwDYYoAUkvFROeGaSZDMMYAWgl18Pnk03snSrhqC5E+NlPL/A4AXb8wtAKHl4IOngcCLJ++8PlBBcMMfAEBmpplDqADo9q8BO0/k88lduQw0AEjPwdEY+abIFHD/Adh5ricInYM151JCPfrTsrU3Z9QjBL4UBQCj37HD0TVjWNDTAZjq2eRoAXT7o0rxpMUieu19LwDauPnJVACAil5cAr6jMdjB6cnhijFr+gqAs9aG99Xoavjq7cC86YMAsue3Eki6vQ5aAKjD50mPv/EK6ZvpstFJF8Z6yL5UDbB9KRfJPwpA83DTex7jJmRPAIfX2FtR6e2ECQTei/Hn3hhH8hffA6QiQuaUqAQBOxoqnuttCJriJX87hsvf+SZIEGLMXUlo4UkQ8N5/9CH43m8BguBbt64d056EWdYv/NfgD6q5GS9b95XyAAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
          <CurrencyText>Marks:</CurrencyText>
          <svg
            width="64"
            height="16"
            viewBox="0 0 64 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="64" height="16" fill="url(#pattern1)" />
            <defs>
              <pattern
                id="pattern1"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use href="#image1" transform="scale(0.015625 0.0625)" />
              </pattern>
              <image
                id="image1"
                width="64"
                height="16"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAB40lEQVRYR+WXPUsDQRCGN03SCEKKhPwCQRDEQgsLNYVYC341CukCtoJYpEghtkIgnRArP8DaSrCw0EKsAv6CkBSpbJJGeZfMse7N7s4qiCFXHXf37jvzzMzeXUZN+JHx5b9TKHzi/nWv533OtcY46J2JIfjjzRWd29ndYzSEcdGzACj47NSyGn48RUOw9Vinfnkqhkj6+eaN9n6rbkcVISb+FABTrBZn1PDhIulwSSdw5lhACsFMvn17r71ntzbEEDh/KiQX/zcAdvIwNwGExsEHTwLBTp68s+WKCIITfrmi1Mu77mYbQgpAbf9EofJEvn10noyBBADpbXDURr4uQgJX3a5C5W09QdgtFp2jBD38aWzNzRl6QLBHMQ2g0UqSx4luwxE9EYCR/qcAao1WKnlKBEnUDw+8AGjjtt9MGoBSKT07Ar5XY6iCrgCkHfDX+hSAaj7v/TRq9vveCoybPgjgtdNJgCyUSkoKADo8T3qc4wjplwYDreMOrPWcy4kKYPpSLJx/FIC1vXXv+xibkNkBNrzp1TmR3gyYQOBajL/tjXU4f/Y7gEsiZE6BchBQ0VDytt6EIEme8zfXcPk7vwQJQoy5KwgpPA4Crv1GH4Lv/RcgCL65de2YZif8Z/3E/w1+AXZgHy/SZVbdAAAAAElFTkSuQmCC"
              />
            </defs>
          </svg>
          <svg
            width="40"
            height="37"
            viewBox="0 0 40 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M31.4353 4.97327L18.8235 7.34827L6.31058 4.97327C2.89646 4.97327 0.124695 8.10352 0.124695 11.9676V23.7999C0.124695 27.6616 2.89646 30.7895 6.31058 30.7895L18.8235 28.3504L31.4353 30.7895C34.8541 30.7895 37.6235 27.6616 37.6235 23.7999V11.9676C37.6235 8.10352 34.8541 4.97327 31.4353 4.97327ZM14.1176 21.4724H11.84V23.75H4.70587V11.875H11.84V14.25H14.1176V21.4724ZM23.5294 23.75H16.4706V11.875H18.8235V21.4344H21.1765V11.875H23.5294V23.75ZM32.9412 19.0594L30.6823 19V23.75H28.1412L28.1882 19.0594H25.8823V11.875H28.1882V19.0594H30.6823V11.875H32.9412V19.0594Z"
              fill="#008C30"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.05884 19V21.4629H11.7788V19H7.05884Z"
              fill="#008C30"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.05884 14.25H11.8259V16.6939H7.05884V14.25Z"
              fill="#008C30"
            />
          </svg>
        </CurrencyView>
      </BarView>
    );
  }
}

//  Styles

const BarView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 37px;
  left: 0px;
  bottom: 0px;

  background: #7e0000;
  border: 1px solid #ffdc61;
  box-sizing: border-box;
`;

const CurrencyView = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 0;
  width: 632px;
  height: 36px;

  background: linear-gradient(
      0deg,
      rgba(241, 219, 177, 0.7),
      rgba(241, 219, 177, 0.7)
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(86277jpg);
  border: 1px solid #ffdc61;
  box-sizing: border-box;
`;

const CurrencyText = styled.p`
  margin-top: -1px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #000000;
`;
// Styles for the Sound Controls

const SoundView = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  height: 37px;
`;

const SoundImg = styled.div`
  margin-right: 10px;
  margin-top: 5px;
`;

const SoundText = styled.p`
  margin-top: 2px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #ffffff;
`;

// Styles for the Help Text box

const HelpView = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 40px;
  height: 37px;
`;

const HelpImg = styled.div`
  margin-right: 8px;
  margin-top: 3px;
`;

const HelpText = styled.p`
  margin-top: 2px;
  font-family: Pirata One;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 31px;
  /* identical to box height */

  color: #ffffff;
`;
