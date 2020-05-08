import styled from 'styled-components';
import { primaryColor, dangerColor } from 'app/utils/styled-components.utils';

interface ButtonProps {
    isGhost?: boolean
    danger?: boolean
}

const Button = styled.button<ButtonProps>`
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${primaryColor};
    border-radius: 3px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
    &:hover {
        opacity: .75;
    }
    &:disabled {
        cursor: not-allowed;
    }
`;

const readFontColorProps = (props: ButtonProps) => {
    if (props.isGhost) {
        if (props.danger) {
            return dangerColor;
        }
        return primaryColor;
    }
    return 'white';
};

const readBackgroundColorProps = (props: ButtonProps) => {
    if (props.isGhost) {
        return 'transparent';
    }
    if (props.danger) {
        return dangerColor;
    }
    return primaryColor;
};

/**
 * Default Button
 * props: @isGhost {boolean}
 */
export const DefaultButton = styled(Button)`
    color: ${readFontColorProps};
    background-color: ${readBackgroundColorProps};
    border: 2px solid ${(props) => (props.danger ? dangerColor : primaryColor)};
 
`;

/**
 * Rounded Button
 * props: @isGhost {boolean}
 */
export const RoundedButton = styled(Button)`
    color: ${readFontColorProps};
    background-color: ${readBackgroundColorProps};
    border-radius: 50px;
    border: 2px solid ${(props) => (props.danger ? dangerColor : primaryColor)};
    -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.64);
    -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.64);
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.64);
`;
