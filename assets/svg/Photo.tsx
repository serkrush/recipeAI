import React from 'react';
import {ColorValue} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Photo = ({
    fill = '#FF33DD' as ColorValue,
    width = 22,
    height = 18,
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M3.01953 17.8721C2.07031 17.8721 1.35254 17.6289 0.866211 17.1426C0.379883 16.6621 0.136719 15.9531 0.136719 15.0156V5.7959C0.136719 4.8584 0.379883 4.14941 0.866211 3.66895C1.35254 3.18262 2.07031 2.93945 3.01953 2.93945H5.32227C5.66797 2.93945 5.92578 2.90137 6.0957 2.8252C6.26562 2.74316 6.45312 2.59375 6.6582 2.37695L7.35254 1.62109C7.58691 1.38086 7.83594 1.20215 8.09961 1.08496C8.36328 0.961914 8.7207 0.900391 9.17188 0.900391H12.7842C13.2295 0.900391 13.584 0.961914 13.8477 1.08496C14.1172 1.20215 14.3662 1.38086 14.5947 1.62109L15.2891 2.37695C15.4297 2.52344 15.5557 2.6377 15.667 2.71973C15.7842 2.80176 15.9131 2.86035 16.0537 2.89551C16.2002 2.9248 16.3906 2.93945 16.625 2.93945H18.9717C19.9209 2.93945 20.6387 3.18262 21.125 3.66895C21.6172 4.14941 21.8633 4.8584 21.8633 5.7959V15.0156C21.8633 15.9531 21.6172 16.6621 21.125 17.1426C20.6387 17.6289 19.9209 17.8721 18.9717 17.8721H3.01953ZM11 15.1211C11.6562 15.1211 12.2715 15.001 12.8457 14.7607C13.4199 14.5146 13.9238 14.1748 14.3574 13.7412C14.791 13.3076 15.1279 12.8037 15.3682 12.2295C15.6143 11.6553 15.7373 11.0342 15.7373 10.3662C15.7373 9.4873 15.5264 8.6875 15.1045 7.9668C14.6826 7.24609 14.1113 6.6748 13.3906 6.25293C12.6699 5.83105 11.873 5.62012 11 5.62012C10.3379 5.62012 9.71973 5.74316 9.14551 5.98926C8.57129 6.22949 8.06738 6.56641 7.63379 7C7.20605 7.43359 6.86914 7.9375 6.62305 8.51172C6.37695 9.08594 6.25391 9.7041 6.25391 10.3662C6.25391 11.0342 6.37695 11.6553 6.62305 12.2295C6.86914 12.8037 7.20605 13.3076 7.63379 13.7412C8.06738 14.1748 8.57129 14.5146 9.14551 14.7607C9.71973 15.001 10.3379 15.1211 11 15.1211ZM11 13.5479C10.4141 13.5479 9.88086 13.4072 9.40039 13.126C8.91992 12.8389 8.53613 12.4551 8.24902 11.9746C7.96191 11.4941 7.81836 10.958 7.81836 10.3662C7.81836 9.78027 7.96191 9.24707 8.24902 8.7666C8.53613 8.28613 8.91992 7.90234 9.40039 7.61523C9.88086 7.32812 10.4141 7.18457 11 7.18457C11.5859 7.18457 12.1191 7.32812 12.5996 7.61523C13.0801 7.90234 13.4609 8.28613 13.7422 8.7666C14.0293 9.24707 14.1729 9.78027 14.1729 10.3662C14.1729 10.958 14.0293 11.4941 13.7422 11.9746C13.4609 12.4551 13.0801 12.8389 12.5996 13.126C12.1191 13.4072 11.5859 13.5479 11 13.5479ZM16.335 7.14062C16.335 7.46289 16.4492 7.73535 16.6777 7.95801C16.9062 8.18066 17.1787 8.28906 17.4951 8.2832C17.7998 8.27734 18.0635 8.16602 18.2861 7.94922C18.5146 7.73242 18.6289 7.46289 18.6289 7.14062C18.6289 6.83594 18.5146 6.56934 18.2861 6.34082C18.0576 6.1123 17.7939 5.99805 17.4951 5.99805C17.1787 5.99805 16.9062 6.1123 16.6777 6.34082C16.4492 6.56934 16.335 6.83594 16.335 7.14062Z"
                fill={fill}
            />
        </Svg>
    );
};

export default Photo;
