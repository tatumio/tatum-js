/* tslint:disable:no-bitwise */
import {keccak_256} from 'js-sha3';

const hexChar2byte = (c: string) => {
    let d = 0;

    if (c >= 'A' && c <= 'F')
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    else if (c >= 'a' && c <= 'f')
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    else if (c >= '0' && c <= '9')
        d = c.charCodeAt(0) - '0'.charCodeAt(0);

    return d;
};

const isHexChar = (c: string) => {
    if ((c >= 'A' && c <= 'F') ||
        (c >= 'a' && c <= 'f') ||
        (c >= '0' && c <= '9')) {
        return 1;
    }

    return 0;
};

const hexStr2byteArray = (str: string) => {
    const byteArray = Array();
    let d = 0;
    let j = 0;
    let k = 0;

    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);

        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;

            if (0 === (j % 2)) {
                byteArray[k++] = d;
                d = 0;
            }
        }
    }

    return byteArray;
};

// @ts-ignore
const byte2hexStr = byte => {
    const hexByteMap = '0123456789ABCDEF';

    let str = '';
    str += hexByteMap.charAt(byte >> 4);
    str += hexByteMap.charAt(byte & 0x0f);

    return str;
};


// @ts-ignore
const byteArray2hexStr = byteArray => {
    let str = '';

    for (let i = 0; i < (byteArray.length); i++)
        str += byte2hexStr(byteArray[i]);

    return str;
};

// @ts-ignore
const computeAddress = pubBytes => {
    if (pubBytes.length === 65)
        pubBytes = pubBytes.slice(1);

    const hash = keccak_256(pubBytes).toString();
    const addressHex = '41' + hash.substring(24);

    return hexStr2byteArray(addressHex);
};

// @ts-ignore
export const generateAddress = (publicKey) => byteArray2hexStr(computeAddress(publicKey));
