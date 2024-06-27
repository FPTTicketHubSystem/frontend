import '../../assets/HeaderNavStyle.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'antd';
import { useStat, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
// import { UserContext } from '../../contexts/UserContext';

export default function Navbar() {
    const { user, onSetUser } = useContext(UserContext);
    const navigate = useNavigate();
    const itemsOfTuHoc = [
        {
            key: '1',
            label: (
                <>
                    <div>
                        <a
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                                navigate('/practiceQuizz');
                            }}
                        >
                            <button
                                type='button'
                                tabindex='0'
                                role='menuitem'
                                class='sc-dOSReg lhXIuw dropdown-item'
                                style={{ color: 'black' }}
                            >
                                <svg
                                    viewBox='0 0 24 24'
                                    aria-hidden='true'
                                    focusable='false'
                                    fill='#000000'
                                    xmlns='http://www.w3.org/2000/svg'
                                    class='StyledIconBase-ea9ulj-0 jZGNBW'
                                >
                                    <path
                                        fill='none'
                                        d='M0 0h24v24H0z'
                                    ></path>
                                    <path
                                        fill='#000000'
                                        d='M16.757 3l-7.466 7.466.008 4.247 4.238-.007L21 7.243V20a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z'
                                    ></path>
                                </svg>
                                Luyện tập trắc nghiệm
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    <div>
                        <a
                            style={{ textDecoration: 'none', color: 'black' }}
                            onClick={() => {
                                navigate('/testSubject');
                            }}
                        >
                            <button
                                type='button'
                                tabindex='0'
                                role='menuitem'
                                class='sc-dOSReg lhXIuw dropdown-item'
                            >
                                <svg
                                    width='16'
                                    height='20'
                                    viewBox='0 0 16 18'
                                    fill='none'
                                    class='nav-icon'
                                >
                                    <path
                                        d='M16 2.46154V8.61539C16 9.35897 15.9984 9.90545 15.9952 10.2548C15.992 10.6042 15.9872 11.0641 15.9808 11.6346C15.9744 12.2051 15.9599 12.6282 15.9375 12.9038C15.9151 13.1795 15.8846 13.5272 15.8462 13.9471C15.8077 14.367 15.758 14.6955 15.6971 14.9327C15.6362 15.1699 15.5641 15.4391 15.4808 15.7404C15.3974 16.0417 15.2965 16.3077 15.1779 16.5385C15.0593 16.7692 14.9231 17 14.7692 17.2308H0C0.50641 15.6795 0.838141 14.2452 0.995192 12.9279C1.15224 11.6106 1.23077 9.76282 1.23077 7.38462V2.46154L3.69231 2.48077V8C3.69231 8.55128 3.86218 8.9968 4.20192 9.33654C4.54167 9.67628 4.98718 9.84615 5.53846 9.84615C6.42949 9.84615 7.00641 9.54808 7.26923 8.95192C7.34615 8.77244 7.38462 8.45513 7.38462 8V3.69231H6.15385V8C6.15385 8.25 6.11539 8.41506 6.03846 8.49519C5.96154 8.57532 5.79487 8.61539 5.53846 8.61539C5.32692 8.59615 5.16987 8.54006 5.06731 8.44712C4.96474 8.35417 4.91667 8.20513 4.92308 8V2.46154H16ZM5.06731 1.52885C5.25962 1.20833 5.52244 1.04808 5.85577 1.04808C6.24039 1.04808 6.52885 1.1266 6.72115 1.28365C6.91346 1.44071 7.02564 1.70513 7.05769 2.07692H8.28846C8.28846 1.71795 8.2468 1.43269 8.16346 1.22115C8.03526 0.907051 7.77724 0.625 7.38942 0.375C7.0016 0.125 6.51603 0 5.93269 0C5.29167 0 4.76282 0.176282 4.34615 0.528846C3.91026 0.907051 3.69231 1.37821 3.69231 1.94231V2.46154H4.92308V2.23077L4.93269 1.97115L4.97596 1.76923L5.06731 1.52885Z'
                                        fill='#000000'
                                    ></path>
                                </svg>
                                Đề kiểm tra
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
    ];

    const url = window.location.pathname;

    const checkTrangChu = url == '/';
    const checkTuHoc =
        url.includes('practiceQuizz') ||
        url.includes('testSubject') ||
        url.includes('takeExam') ||
        url.includes('study') ||
        url.includes('exam') ||
        url.includes('examResult');
    const checkLichSuOnLuyen = url.includes('testHistory');
    const checkNews = url.includes('news');
    const checkForum = url.includes('forum');

    return (
        <>
            <div className='sc-iBaPrD gdARiY d-sm-block d-none'>
                <ul className='sc-eggNIi JiLrb list-inline'>
                    {/* <a
                        className={checkTrangChu ? 'isActive' : ''}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <li
                            class='sc-cTkwdZ degoCR list-inline-item'
                            style={{ color: '#000000' }}
                        >
                            <svg
                                viewBox='0 0 24 24'
                                aria-hidden='true'
                                focusable='false'
                                fill='currentColor'
                                xmlns='http://www.w3.org/2000/svg'
                                class='StyledIconBase-ea9ulj-0 jZGNBW nav-icon'
                            >
                                <g data-name='Layer 2'>
                                    <path
                                        fill='#000000'
                                        d='M20.42 10.18L12.71 2.3a1 1 0 00-1.42 0l-7.71 7.89A2 2 0 003 11.62V20a2 2 0 001.89 2h14.22A2 2 0 0021 20v-8.38a2.07 2.07 0 00-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 00-1-1H9a1 1 0 00-1 1v7H5v-8.42l7-7.15 7 7.19z'
                                        data-name='home'
                                    ></path>
                                </g>
                            </svg>
                            Trang chủ
                        </li>
                    </a> */}
                    {/* <div className='sc-jNMdTA ewqGCM dropdown'>
                        <Dropdown
                            menu={{
                                items: itemsOfTuHoc,
                            }}
                        >
                            <button
                                type='button'
                                aria-aria-haspopup='true'
                                aria-expanded='false'
                                className='btn btn-secondary'
                            >
                                <a
                                    className={checkTuHoc ? 'isActive' : ''}
                                >
                                    <li
                                        className='sc-cTkwdZ degoCR list-inline-item'
                                        style={{ color: 'black' }}
                                    >
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            class='nav-icon'
                                        >
                                            <path
                                                d='M17.6667 9.66667H16.3333C16.2895 9.66678 16.2461 9.65823 16.2057 9.64151C16.1652 9.6248 16.1284 9.60025 16.0974 9.56928C16.0664 9.5383 16.0419 9.50151 16.0252 9.46103C16.0084 9.42054 15.9999 9.37714 16 9.33334V9.14651C16.7892 8.65964 17.3538 7.88033 17.5705 6.97867C17.8698 6.92462 18.1415 6.76991 18.3407 6.54022C18.54 6.31052 18.6547 6.01964 18.6659 5.71579C18.6771 5.41194 18.5842 5.11338 18.4024 4.86961C18.2207 4.62585 17.9611 4.45153 17.6667 4.37555V3.00001C17.6659 2.41525 17.4458 1.85204 17.05 1.42166C16.6541 0.991274 16.1112 0.725009 15.5285 0.675467C15.3881 0.466796 15.1984 0.295982 14.9762 0.17816C14.754 0.0603387 14.5061 -0.000852407 14.2546 8.96966e-06H13C12.2046 0.00090226 11.4421 0.31726 10.8797 0.879675C10.3173 1.44209 10.0009 2.20463 10 3.00001V4.00001C10 4.08841 10.0351 4.1732 10.0976 4.23571C10.1601 4.29822 10.2449 4.33334 10.3333 4.33334H10.6667V4.37538C10.3724 4.45135 10.1129 4.62557 9.93119 4.86918C9.74947 5.1128 9.65644 5.41118 9.66749 5.7149C9.67855 6.01862 9.79303 6.30944 9.99198 6.5392C10.1909 6.76895 10.4624 6.92385 10.7614 6.97822C10.7701 7.0148 10.7793 7.05123 10.7892 7.08751L11.4325 6.91251C11.3665 6.66939 11.3332 6.41858 11.3333 6.16667V4.32326C12.6496 4.26033 13.9316 3.88249 15.0717 3.22147C15.1636 3.57255 15.3417 3.89512 15.5899 4.15992C15.8381 4.42472 16.1484 4.62336 16.4928 4.73784L17 4.90693V6.16667C17 6.68655 16.8569 7.19638 16.5865 7.64038C16.316 8.08438 15.9287 8.44543 15.4668 8.684C15.0049 8.92258 14.4863 9.02948 13.9677 8.99302C13.4491 8.95655 12.9505 8.77812 12.5265 8.47726L12.1401 9.02051C12.3063 9.13857 12.4825 9.24192 12.6667 9.32938V9.33334C12.6666 9.42172 12.6314 9.50644 12.5689 9.56893C12.5064 9.63142 12.4217 9.66657 12.3333 9.66667H12V8.66667C11.9996 8.31317 11.859 7.97427 11.609 7.7243C11.3591 7.47434 11.0202 7.33374 10.6667 7.33334H1.33333C0.979833 7.33374 0.640925 7.47434 0.390963 7.7243C0.141 7.97427 0.000397018 8.31317 0 8.66667V9.66667H0.666667V8.66667C0.666876 8.48993 0.737181 8.32048 0.86216 8.1955C0.987139 8.07052 1.15659 8.00022 1.33333 8.00001H10.6667C10.8434 8.00022 11.0129 8.07052 11.1378 8.1955C11.2628 8.32048 11.3331 8.48993 11.3333 8.66667V14.6667C11.3331 14.8434 11.2628 15.0129 11.1378 15.1378C11.0129 15.2628 10.8434 15.3331 10.6667 15.3333H6.98375L7.32592 13.7365C7.33633 13.6879 7.33574 13.6376 7.3242 13.5893C7.31266 13.5409 7.29045 13.4958 7.25921 13.4571C7.22796 13.4185 7.18847 13.3873 7.14362 13.3659C7.09877 13.3445 7.0497 13.3333 7 13.3333H4.66667C4.60143 13.3333 4.53763 13.3525 4.48317 13.3884C4.42871 13.4243 4.38599 13.4754 4.36029 13.5354L3.58975 15.3333H1.33333C1.15659 15.3331 0.987139 15.2628 0.86216 15.1378C0.737181 15.0129 0.666876 14.8434 0.666667 14.6667V10.3333H0V14.6667C0.000397018 15.0202 0.141 15.3591 0.390963 15.609C0.640925 15.859 0.979833 15.9996 1.33333 16H3.30417L2.44688 18H0.333333C0.244928 18 0.160143 18.0351 0.0976311 18.0976C0.0351189 18.1601 0 18.2449 0 18.3333V19.6667C0 19.7551 0.0351189 19.8399 0.0976311 19.9024C0.160143 19.9649 0.244928 20 0.333333 20H19.6667C19.7551 20 19.8399 19.9649 19.9024 19.9024C19.9649 19.8399 20 19.7551 20 19.6667V18.3333C20 18.2449 19.9649 18.1601 19.9024 18.0976C19.8399 18.0351 19.7551 18 19.6667 18H19.0943C19.3789 17.7503 19.6069 17.4427 19.7631 17.0978C19.9193 16.7529 20 16.3786 20 16V15.6667H19.3333V16C19.3327 16.5303 19.1218 17.0386 18.7469 17.4135C18.3719 17.7885 17.8636 17.9994 17.3333 18H12V17.3333C12.0003 17.0682 12.1058 16.814 12.2932 16.6266C12.4807 16.4391 12.7349 16.3336 13 16.3333H17.3333C17.4217 16.3333 17.5065 16.2982 17.569 16.2357C17.6315 16.1732 17.6667 16.0884 17.6667 16V13.6667H19.3333V15H20V12C19.9993 11.3814 19.7532 10.7883 19.3158 10.3509C18.8784 9.91344 18.2853 9.66738 17.6667 9.66667ZM17.6667 6.16667V5.09022C17.7552 5.14123 17.8308 5.21193 17.8876 5.29684C17.9444 5.38175 17.9809 5.4786 17.9943 5.57988C18.0076 5.68117 17.9975 5.78417 17.9647 5.88092C17.9319 5.97766 17.8772 6.06556 17.805 6.1378C17.7631 6.17935 17.7159 6.21522 17.6647 6.24451C17.6653 6.21855 17.6667 6.19276 17.6667 6.16667ZM10.3333 5.66667C10.3332 5.57917 10.3503 5.49249 10.3838 5.41163C10.4172 5.33078 10.4664 5.25734 10.5283 5.19555C10.5697 5.15455 10.6162 5.11909 10.6667 5.09005V6.16667C10.6667 6.19247 10.6674 6.21817 10.668 6.24392C10.5664 6.18559 10.482 6.10151 10.4232 6.00017C10.3645 5.89884 10.3335 5.78381 10.3333 5.66667ZM15 2.48584C13.7831 3.25845 12.3711 3.66807 10.9296 3.66668H10.6667V3.29538C13.5201 2.92167 14.5263 1.94513 14.569 1.90238L14.0998 1.42888C14.0973 1.43122 13.8549 1.66176 13.2697 1.92826C12.7774 2.15247 11.9458 2.44384 10.6984 2.61834C10.7339 2.40294 10.7997 2.19365 10.8938 1.99668C12.1409 1.96147 12.7873 1.64568 12.8158 1.63147L12.5194 1.0343C12.5147 1.03663 12.1415 1.21313 11.4107 1.29384C11.8416 0.890589 12.4098 0.66637 13 0.666676H14.2546C14.4044 0.66614 14.5519 0.704423 14.6825 0.777794C14.8131 0.851165 14.9225 0.957123 15 1.08534V2.48584ZM16.7037 4.10542C16.4015 4.00503 16.1387 3.81198 15.9526 3.5537C15.7664 3.29542 15.6664 2.98505 15.6667 2.66668V1.36668C16.0429 1.44403 16.3809 1.64873 16.6238 1.94625C16.8666 2.24378 16.9995 2.61594 17 3.00001V4.20417L16.7037 4.10542ZM13.3071 9.55997C13.98 9.72996 14.6882 9.69625 15.3419 9.46309C15.37 9.68196 15.4701 9.88528 15.6264 10.0411C15.6756 10.0901 15.7297 10.1339 15.7878 10.1718L15.6928 10.2984C15.524 10.5242 15.3031 10.7059 15.049 10.828C14.795 10.9501 14.5151 11.0091 14.2334 10.9999C13.9516 10.9908 13.6762 10.9137 13.4306 10.7753C13.185 10.6369 12.9764 10.4412 12.8226 10.205C12.9436 10.1368 13.0492 10.0443 13.1326 9.93331C13.216 9.82228 13.2754 9.69515 13.3071 9.55997ZM11.3333 17.3333V18H9.66667V17.3333H11.3333ZM10.6257 16H10.6667C10.7791 16.0001 10.8911 15.9859 11 15.9578V16.6667H10.359L10.6257 16ZM7.959 16H9.90767L9.641 16.6667H9.33333C9.24493 16.6667 9.16014 16.7018 9.09763 16.7643C9.03512 16.8268 9 16.9116 9 17V18H8.33333V17C8.33333 16.9116 8.29821 16.8268 8.2357 16.7643C8.17319 16.7018 8.08841 16.6667 8 16.6667H7.69233L7.959 16ZM6.84088 16H7.24088L6.97421 16.6667H6.69792L6.84088 16ZM7.66667 17.3333V18H6.4125L6.55533 17.3333H7.66667ZM4.88646 14H6.5875L5.73038 18H3.17204L4.88646 14ZM19.3333 18.6667V19.3333H0.666667V18.6667H19.3333ZM19.3333 13H17.6667V12H17V15.6667H13C12.7411 15.6667 12.4858 15.7271 12.2544 15.843C12.0229 15.9589 11.8217 16.1272 11.6667 16.3345V15.547C11.8816 15.3041 12.0002 14.991 12 14.6667V10.3333H12.1275C12.3126 10.7016 12.5887 11.0165 12.9295 11.2481C13.2704 11.4798 13.6648 11.6206 14.0753 11.6571C14.4858 11.6937 14.8988 11.6248 15.2752 11.457C15.6517 11.2892 15.979 11.0281 16.2262 10.6983L16.5 10.3333H17.6667C18.1085 10.3338 18.5322 10.5096 18.8446 10.822C19.1571 11.1345 19.3328 11.5581 19.3333 12V13ZM15.641 12.0333L15.9316 12.6333C15.3929 12.8942 14.7985 13.0193 14.2003 12.9976C13.6021 12.9759 13.0184 12.808 12.5 12.5088L12.8333 11.9314C13.2575 12.1763 13.7351 12.3136 14.2245 12.3314C14.7139 12.3491 15.2002 12.2468 15.641 12.0333H15.641ZM13.3333 5.33334C13.3333 5.4652 13.2942 5.59409 13.221 5.70372C13.1477 5.81335 13.0436 5.8988 12.9218 5.94926C12.8 5.99972 12.6659 6.01292 12.5366 5.9872C12.4073 5.96147 12.2885 5.89798 12.1953 5.80475C12.102 5.71151 12.0385 5.59272 12.0128 5.4634C11.9871 5.33408 12.0003 5.20004 12.0507 5.07822C12.1012 4.9564 12.1867 4.85228 12.2963 4.77903C12.4059 4.70577 12.5348 4.66668 12.6667 4.66668C12.8434 4.66688 13.0129 4.73719 13.1378 4.86217C13.2628 4.98715 13.3331 5.15659 13.3333 5.33334ZM14.6667 5.33334C14.6667 5.20149 14.7058 5.07259 14.779 4.96296C14.8523 4.85333 14.9564 4.76788 15.0782 4.71742C15.2 4.66696 15.3341 4.65376 15.4634 4.67948C15.5927 4.70521 15.7115 4.7687 15.8047 4.86194C15.898 4.95517 15.9615 5.07396 15.9872 5.20328C16.0129 5.3326 15.9997 5.46665 15.9493 5.58846C15.8988 5.71028 15.8133 5.8144 15.7037 5.88765C15.5941 5.96091 15.4652 6.00001 15.3333 6.00001C15.1566 5.9998 14.9871 5.92949 14.8622 5.80451C14.7372 5.67954 14.6669 5.51009 14.6667 5.33334ZM14.8182 6.42501L15.1818 6.9838C14.83 7.21244 14.4195 7.33413 14 7.33413C13.5805 7.33413 13.17 7.21244 12.8182 6.9838L13.1818 6.42501C13.4253 6.58333 13.7095 6.66761 14 6.66761C14.2905 6.66761 14.5747 6.58333 14.8182 6.42501ZM4.66667 9.66667H3.33333V9.00001H4.66667V9.66667ZM6.66667 9.00001V9.66667H5.33333V9.00001H6.66667ZM8.66667 9.00001V9.66667H7.33333V9.00001H8.66667ZM10.6667 9.66667H9.33333V9.00001H10.6667V9.66667ZM2.66667 9.00001V9.66667H1.33333V9.00001H2.66667Z'
                                                fill='#000000'
                                            ></path>
                                        </svg>
                                        Tự học
                                        <i>
                                            <svg
                                                viewBox='0 0 24 24'
                                                aria-hidden='true'
                                                focusable='false'
                                                fill='currentColor'
                                                xmlns='http://www.w3.org/2000/svg'
                                                class='StyledIconBase-ea9ulj-0 jZGNBW chev-down'
                                            >
                                                <path d='M16.293 9.293L12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z'></path>
                                            </svg>
                                        </i>
                                    </li>
                                </a>
                            </button>
                        </Dropdown>
                    </div>
                    <a
                        className={checkForum ? 'isActive' : ''}
                        onClick={() => {
                            navigate('/forum');
                        }}
                    >
                        <li
                            class='sc-cTkwdZ degoCR list-inline-item'
                            style={{ color: 'black' }}
                        >
                            <img
                                src='../Image/forum-message-svgrepo-com.svg'
                                alt=''
                                style={{ width: '20px' }}
                                className='icon'
                            />
                            Diễn đàn
                        </li>
                    </a>
                    <a
                        className={checkNews ? 'isActive' : ''}
                        onClick={() => {
                            navigate('/news');
                        }}
                    >
                        <li
                            class='sc-cTkwdZ degoCR list-inline-item'
                            style={{ color: 'black' }}
                        >
                            <svg
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                                class='nav-icon'
                            >
                                <path
                                    d='M9.52732 1.05469C9.44336 1.05469 8.35953 1.05469 7.94529 1.05469C7.94529 0.472183 7.47311 0 6.8906 0C6.3081 0 5.83592 0.472183 5.83592 1.05469C5.45328 1.05469 5.2377 1.05469 4.25389 1.05469C3.96266 1.05469 3.72655 1.32595 3.72655 1.61718V2.14453C3.72655 2.72703 4.19873 3.19921 4.78123 3.19921H8.99997C9.58248 3.19921 10.0547 2.72703 10.0547 2.14453V1.61718C10.0547 1.32595 9.81855 1.05469 9.52732 1.05469Z'
                                    fill='#000000'
                                ></path>
                                <path
                                    d='M12.1992 2.14453H11.1445C11.1445 3.30788 10.1633 4.2539 8.99998 4.2539H4.78124C3.61789 4.2539 2.67187 3.30788 2.67187 2.14453H1.61718C0.744819 2.14453 0 2.85419 0 3.72656V16.3828C0 17.2552 0.744819 18 1.61718 18H12.1992C13.0716 18 13.7812 17.2552 13.7812 16.3828V3.72656C13.7812 2.85419 13.0716 2.14453 12.1992 2.14453ZM2.29904 6.20876C2.09306 6.00278 2.09306 5.66904 2.29904 5.46306C2.50502 5.25708 2.83876 5.25708 3.04474 5.46306L3.72656 6.14492L4.40841 5.46306C4.61439 5.25708 4.94813 5.25708 5.15411 5.46306C5.36009 5.66904 5.36009 6.00278 5.15411 6.20876L4.47225 6.89062L5.15411 7.57247C5.36009 7.77845 5.36009 8.11219 5.15411 8.31817C4.94813 8.52415 4.61439 8.52415 4.40841 8.31817L3.72656 7.63631L3.0447 8.31817C2.83872 8.52415 2.50498 8.52415 2.299 8.31817C2.09302 8.11219 2.09302 7.77845 2.299 7.57247L2.98086 6.89062L2.29904 6.20876ZM6.20879 13.5916L4.09942 15.7009C3.99641 15.8039 3.86148 15.8554 3.72659 15.8554C3.5917 15.8554 3.45673 15.8039 3.35376 15.7009L2.29907 14.6462C2.09302 14.4403 2.09302 14.1066 2.29904 13.9006C2.50502 13.6946 2.83876 13.6946 3.04474 13.9006L3.72656 14.5824L5.4631 12.8459C5.66908 12.6399 6.00281 12.6399 6.20879 12.8459C6.41477 13.0518 6.41477 13.3856 6.20879 13.5916ZM6.20879 9.90016L4.09942 12.0095C3.99641 12.1125 3.86148 12.164 3.72659 12.164C3.5917 12.164 3.45673 12.1125 3.35376 12.0095L2.29907 10.9548C2.09302 10.7489 2.09302 10.4152 2.29904 10.2092C2.50502 10.0032 2.83876 10.0032 3.04474 10.2092L3.72656 10.891L5.4631 9.15446C5.66908 8.94848 6.00281 8.94848 6.20879 9.15446C6.41477 9.36044 6.41477 9.69418 6.20879 9.90016ZM11.1445 14.8008H7.9453C7.65382 14.8008 7.41795 14.5649 7.41795 14.2734C7.41795 13.9819 7.65382 13.7461 7.9453 13.7461H11.1445C11.436 13.7461 11.6719 13.9819 11.6719 14.2734C11.6719 14.5649 11.436 14.8008 11.1445 14.8008ZM11.1445 11.1094H7.9453C7.65382 11.1094 7.41795 10.8735 7.41795 10.582C7.41795 10.2905 7.65382 10.0547 7.9453 10.0547H11.1445C11.436 10.0547 11.6719 10.2905 11.6719 10.582C11.6719 10.8735 11.436 11.1094 11.1445 11.1094ZM11.1445 7.41796H7.9453C7.65382 7.41796 7.41795 7.1821 7.41795 6.89062C7.41795 6.59914 7.65382 6.36327 7.9453 6.36327H11.1445C11.436 6.36327 11.6719 6.59914 11.6719 6.89062C11.6719 7.1821 11.436 7.41796 11.1445 7.41796Z'
                                    fill='#000000'
                                ></path>
                                <path
                                    d='M16.4179 3.19922C15.5456 3.19922 14.8359 3.90888 14.8359 4.78125V6.36327H18V4.78125C18 3.90888 17.2903 3.19922 16.4179 3.19922Z'
                                    fill='#000000'
                                ></path>
                                <path
                                    d='M14.8369 7.41797V13.0003L14.9914 12.8459C15.7783 12.059 17.0596 12.059 17.8465 12.8459L18.001 13.0004V7.41797H14.8369Z'
                                    fill='#000000'
                                ></path>
                                <path
                                    d='M17.0998 13.5915C16.7239 13.2156 16.112 13.2156 15.7361 13.5915L15.1329 14.1947L15.9179 16.5496C15.9895 16.7649 16.1908 16.9101 16.4179 16.9101C16.6451 16.9101 16.8464 16.7649 16.918 16.5496L17.703 14.1947L17.0998 13.5915Z'
                                    fill='#000000'
                                ></path>
                            </svg>
                            Tin tức
                        </li>
                    </a>
                    <div className='sc-jNMdTA ewqGCM dropdown'>
                        <button
                            type='button'
                            aria-aria-haspopup='true'
                            aria-expanded='false'
                            className='btn btn-secondary'
                        >
                            <a
                                className={checkLichSuOnLuyen ? 'isActive' : ''}
                                onClick={() => {
                                    navigate('/testHistory');
                                }}
                            >
                                <li
                                    className='sc-cTkwdZ degoCR list-inline-item'
                                    style={{ color: 'black' }}
                                >
                                    <svg
                                        width='20'
                                        height='20'
                                        viewBox='0 0 20 20'
                                        fill='none'
                                        class='nav-icon'
                                    >
                                        <path
                                            d='M20 16.7017V14.2653L19.0668 14.0268C19.0603 14.0111 19.0538 13.9953 19.0471 13.9798L19.5383 13.1517L17.8155 11.4289L16.9875 11.9202C16.9716 11.9134 16.9558 11.9069 16.9404 11.9005L16.7019 10.9675H14.2655L14.0271 11.9008C14.0113 11.9072 13.9956 11.9137 13.98 11.9205L13.1519 11.4292L11.4291 13.152L11.9204 13.9801C11.9136 13.996 11.9071 14.0117 11.9007 14.0272L10.9677 14.2656V16.702L11.901 16.9405C11.9074 16.9562 11.9139 16.972 11.9207 16.9876L11.4294 17.8156L13.1522 19.5384L13.9803 19.0472C13.9962 19.0539 14.0119 19.0604 14.0274 19.0669L14.2658 19.9998H16.7022L16.9407 19.0665C16.9564 19.0601 16.9722 19.0536 16.9878 19.0469L17.8158 19.5381L19.5387 17.8153L19.0474 16.9872C19.0542 16.9713 19.0606 16.9556 19.0671 16.9402L20 16.7017ZM18.7281 17.7137L17.7139 18.7279L17.0245 18.3188L16.8693 18.393C16.7693 18.4404 16.6671 18.4833 16.5619 18.5205L16.3993 18.5781L16.2013 19.3546H14.7667L14.5687 18.5781L14.4062 18.5205C14.301 18.4836 14.1984 18.4408 14.0987 18.393L13.9436 18.3188L13.2542 18.7279L12.24 17.7137L12.649 17.0243L12.5748 16.8691C12.5274 16.7691 12.4846 16.6669 12.4474 16.5617L12.3897 16.3991L11.6129 16.2011V14.7665L12.3894 14.5685L12.4471 14.406C12.4839 14.3008 12.5268 14.1982 12.5745 14.0985L12.6487 13.9434L12.2396 13.2539L13.2538 12.2397L13.9433 12.6488L14.0984 12.5746C14.1984 12.5272 14.3007 12.4844 14.4059 12.4472L14.5684 12.3895L14.7664 11.6127H16.201L16.399 12.3892L16.5616 12.4469C16.6668 12.4837 16.7693 12.5266 16.869 12.5743L17.0242 12.6485L17.7136 12.2394L18.7278 13.2536L18.3187 13.9431L18.3929 14.0982C18.4403 14.1982 18.4832 14.3004 18.5203 14.4057L18.578 14.5682L19.3548 14.7662V16.2008L18.5783 16.3988L18.5207 16.5613C18.4838 16.6666 18.441 16.7691 18.3932 16.8688L18.3191 17.0239L18.7281 17.7137Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M15.4839 12.9031C14.0609 12.9031 12.9032 14.0608 12.9032 15.4837C12.9032 16.9067 14.0609 18.0644 15.4839 18.0644C16.9068 18.0644 18.0645 16.9067 18.0645 15.4837C18.0645 14.0608 16.9068 12.9031 15.4839 12.9031ZM15.4839 17.4192C14.4164 17.4192 13.5484 16.5512 13.5484 15.4837C13.5484 14.4163 14.4164 13.5482 15.4839 13.5482C16.5513 13.5482 17.4194 14.4163 17.4194 15.4837C17.4194 16.5512 16.5513 17.4192 15.4839 17.4192Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M15.4839 14.1936C14.7722 14.1936 14.1935 14.7723 14.1935 15.4839C14.1935 16.1956 14.7722 16.7742 15.4839 16.7742C16.1955 16.7742 16.7742 16.1956 16.7742 15.4839C16.7742 14.7723 16.1955 14.1936 15.4839 14.1936ZM15.4839 16.1291C15.1281 16.1291 14.8387 15.8397 14.8387 15.4839C14.8387 15.1281 15.1281 14.8388 15.4839 14.8388C15.8397 14.8388 16.129 15.1281 16.129 15.4839C16.129 15.8397 15.8397 16.1291 15.4839 16.1291Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M8.16941 5.46198C8.27747 5.77873 8.46553 6.05799 8.70967 6.27741V6.551L7.17584 7.12607C6.54974 7.3606 6.12903 7.96749 6.12903 8.63612V10.3226H13.871V8.63612C13.871 7.96749 13.4503 7.3606 12.8245 7.12575L11.2903 6.55069V6.27741C11.5345 6.05831 11.7225 5.77904 11.8306 5.46198C12.4384 5.3577 12.9032 4.83036 12.9032 4.19355V2.90323C12.9032 1.30261 11.6009 0 9.99999 0C8.39906 0 7.09677 1.30261 7.09677 2.90323V4.19355C7.09677 4.83036 7.56158 5.3577 8.16941 5.46198ZM10.6452 6.68488L9.99999 7.76005L9.35483 6.68488V6.66126C9.55708 6.73324 9.7735 6.77419 9.99999 6.77419C10.2265 6.77419 10.4429 6.73292 10.6452 6.66126V6.68488ZM8.8938 7.17064L9.54416 8.25416L8.89805 8.57705L8.48065 7.32548L8.8938 7.17064ZM13.2258 8.63612V9.67742H6.77419V8.63612C6.77419 8.23478 7.02652 7.87093 7.40218 7.72996L7.87644 7.55229L8.52129 9.48715L9.99999 8.74779L11.4787 9.48715L12.1235 7.55229L12.5981 7.73028C12.9735 7.87093 13.2258 8.23478 13.2258 8.63612ZM11.5193 7.32548L11.1019 8.57737L10.4558 8.25447L11.1062 7.17064L11.5193 7.32548ZM9.99999 6.12903C9.28836 6.12903 8.70967 5.55034 8.70967 4.83871V3.52649C9.18189 3.47672 9.62748 3.30456 9.99999 3.01159C10.3725 3.30488 10.8181 3.47672 11.2903 3.52649V4.83871C11.2903 5.55034 10.7116 6.12903 9.99999 6.12903ZM11.9355 4.74909V3.63832C12.1275 3.75031 12.2581 3.95618 12.2581 4.19386C12.2581 4.43155 12.1275 4.6371 11.9355 4.74909ZM9.99999 0.645161C11.2448 0.645161 12.2581 1.65811 12.2581 2.90323V3.08263C12.0675 2.97158 11.849 2.90323 11.6129 2.90323H11.5575C11.0552 2.90323 10.5829 2.70776 10.2281 2.35257L9.99999 2.12418L9.77192 2.35257C9.41674 2.70776 8.94484 2.90323 8.44254 2.90323H8.38709C8.15098 2.90323 7.93252 2.97158 7.74193 3.08263V2.90323C7.74193 1.65811 8.75519 0.645161 9.99999 0.645161ZM8.06451 3.63801V4.74877C7.87251 4.63678 7.74193 4.43091 7.74193 4.19323C7.74193 3.95555 7.87251 3.75 8.06451 3.63801Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M0 20.0001H6.45161V11.613H0V20.0001ZM0.645161 12.2582H5.80645V19.355H0.645161V12.2582Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M1.29031 12.9031H5.16128V13.5482H1.29031V12.9031Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M1.29031 14.1936H1.93547V14.8388H1.29031V14.1936Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M2.58066 14.1936H5.1613V14.8388H2.58066V14.1936Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M1.29031 15.4839H5.16128V16.129H1.29031V15.4839Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M1.29031 16.7744H5.16128V17.4196H1.29031V16.7744Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M4.51611 18.0645H5.16127V18.7096H4.51611V18.0645Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M1.29031 18.0645H3.87096V18.7096H1.29031V18.0645Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M8.61517 14.4215L8.15902 13.9653L6.64062 15.4837L8.15902 17.0021L8.61517 16.546L7.8755 15.8063H10.3226V15.1611H7.8755L8.61517 14.4215Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M3.54836 5.16136C3.54836 4.98369 3.69295 4.83878 3.87094 4.83878H5.35028L4.61061 5.57845L5.06676 6.0346L6.58515 4.5162L5.06676 2.9978L4.61061 3.45395L5.35028 4.19362H3.87094C3.33745 4.19362 2.9032 4.62788 2.9032 5.16136V10.9678H3.54836V5.16136Z'
                                            fill='#000000'
                                        ></path>
                                        <path
                                            d='M15.4839 5.16135V9.22133L14.7442 8.48166L14.288 8.93781L15.8064 10.4562L17.3248 8.93781L16.8687 8.48166L16.129 9.22133V5.16135C16.129 4.62786 15.6948 4.1936 15.1613 4.1936H13.5484V4.83876H15.1613C15.3393 4.83876 15.4839 4.98367 15.4839 5.16135Z'
                                            fill='#000000'
                                        ></path>
                                    </svg>
                                    Lịch sử ôn luyện
                                </li>
                            </a>
                        </button> */}

                        {/* <div tabIndex="-1" role="menu" aria-hidden="true" className="sc-bBrOnJ bhhAF dropdown-menu">
                            <a href="/tu-hoc/luyen-tap">
                                <button type="button" tabindex="0" role="menuitem" class="sc-dOSReg lhXIuw dropdown-item">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 jZGNBW">
                                        <path fill="none" d="M0 0h24v24H0z"></path><path d="M16.757 3l-7.466 7.466.008 4.247 4.238-.007L21 7.243V20a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z">
                                        </path>
                                    </svg>
                                    Luyện tập trắc nghiệm
                                </button>
                            </a>
                        </div> */}
                    {/* </div> */}
                </ul>
            </div>
        </>
    );
}
