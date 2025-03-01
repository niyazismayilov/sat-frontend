import { FormHelperText, InputLabel, Theme, useTheme, lighten } from '@mui/material';
import clsx from 'clsx';
import { getIn } from 'formik';
import quillEmoji from 'quill-emoji';
import { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import { styled } from '@mui/styles';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

Quill.register(
    {
        'formats/emoji': EmojiBlot,
        'modules/emoji-shortname': ShortNameEmoji,
        'modules/emoji-toolbar': ToolbarEmoji,
        'modules/emoji-textarea': TextAreaEmoji,
    },
    true,
);

const InsertEmoticonIcon =
    '<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>';

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    'emoji-toolbar': { buttonIcon: InsertEmoticonIcon },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

const Root = styled('div')(
    ({
        theme,
        color,
        borderColor,
        borderColorHover,
        boxShadow,
        noBorderTop,
        minHeight,
    }: {
        theme: Theme;
        color: string;
        borderColor: string;
        borderColorHover: string;
        boxShadow: string;
        noBorderTop: boolean;
        minHeight: number;
    }) => ({
        position: 'relative',
        '& .label': {
            position: 'absolute',
            top: 0,
            left: 0,
            color: theme.palette.text.secondary,
            transform: 'translate(8px, -6px) scale(0.75)',
            fontWeight: 500,
            padding: '0px 6px',
            transition: '.2s color',
            backgroundColor: theme.palette.background.default,
        },
        '& .errorLabel': {
            color: theme.palette.error.main,
        },
        '& a': {
            color: 'unset',
        },
        '& .bem': {
            marginTop: 6,
        },
        '& #tab-panel, & #tab-toolbar': {
            backgroundColor: lighten(theme.palette.background.paper, 0.05),
        },
        '& .ql-editor.ql-blank::before': {
            ...theme.typography.body1,
            fontStyle: 'normal',
            color: theme.palette.text.secondary,
        },
        '& .ql-stroke': {
            stroke: color,
        },
        '& .ql-fill': {
            fill: color,
        },
        '& .ql-picker-label': {
            border: 'none !important',
        },
        '& .ql-picker-label::before': {
            color,
        },
        '& .ql-picker-item:hover': {
            '&::before': {
                color: theme.palette.primary.main,
            },
        },
        '& .ql-picker': {
            '& *': {
                border: 'none',
                outline: 'none',
            },
        },
        '& .ql-tooltip': {
            left: '0px !important',
            backgroundColor: theme.palette.background.default,
            boxShadow: `0px 0px 4px 0px ${boxShadow}`,
            border: 'none',
            color: theme.palette.text.primary,
            '& *': {
                outline: 'none',
            },
            '& input': {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                borderColor,
            },
        },
        '& .ql-toolbar button:hover': {
            '& .ql-stroke': {
                stroke: theme.palette.primary.main,
            },
            '& .ql-fill': {
                fill: theme.palette.primary.main,
            },
            '& .ql-picker-label::before': {
                color: theme.palette.primary.main,
            },
        },
        '& .ql-picker-label:hover': {
            '& .ql-stroke': {
                stroke: `${theme.palette.primary.main} !important`,
            },
            '&::before': {
                color: `${theme.palette.primary.main} !important`,
            },
        },
        '& .ql-active .ql-stroke': {
            stroke: `${theme.palette.primary.main} !important`,
        },
        '& .ql-active .ql-fill': {
            fill: `${theme.palette.primary.main} !important`,
        },
        '& .ql-active .ql-picker-label::before ': {
            color: `${theme.palette.primary.main} !important`,
        },
        '& .ql-toolbar': {
            borderTopLeftRadius: noBorderTop ? 0 : theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            transition: '.2s border-color',
            borderColor,
            '& .MuiSvgIcon-root': {
                fill: theme.palette.text.primary,
                '&:hover': {
                    fill: theme.palette.primary.main,
                },
            },
        },
        '& .ql-container': {
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            transition: '.2s border-color',
            borderColor,
        },
        '& .ql-editor': {
            minHeight,
            fontSize: '16px',
        },
        '& input': {
            fontSize: '16px !important',
        },
        '&:hover': {
            '& .ql-toolbar': {
                borderColor: borderColorHover,
            },
            '& .ql-container': {
                borderColor: borderColorHover,
            },
        },
        '& .touched': {
            '& .ql-toolbar': {
                borderColor: theme.palette.primary.main,
            },
            '& .ql-container': {
                borderColor: theme.palette.primary.main,
            },
            '&:hover': {
                '& .ql-toolbar': {
                    borderColor: theme.palette.primary.main,
                },
                '& .ql-container': {
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        '& .error': {
            '& .ql-editor.ql-blank::before': {
                color: '#ff1744',
            },
            '& .ql-toolbar': {
                borderColor: theme.palette.error.main,
            },
            '& .ql-container': {
                borderColor: theme.palette.error.main,
            },
            '&:hover': {
                '& .ql-toolbar': {
                    borderColor: theme.palette.error.main,
                },
                '& .ql-container': {
                    borderColor: theme.palette.error.main,
                },
            },
        },
    }),
);

export const RichTextEditor = ({ field, form, label, minHeight = 150, noBorderTop = false, ...props }) => {
    const error = getIn(form.errors, field.name, undefined);
    const touched = getIn(form.touched, field.name, undefined);
    const quillRef = useRef<ReactQuill>(null);
    const theme = useTheme();

    const color = theme.dark ? '#FFF' : '#424242';
    const borderColor = theme.dark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)';
    const borderColorHover = theme.dark ? '#e6e5e8' : '#000';
    const boxShadow = theme.dark ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.23)';

    return (
        <Root
            className={!error && touched && 'error'}
            color={color}
            borderColor={borderColor}
            borderColorHover={borderColorHover}
            boxShadow={boxShadow}
            minHeight={minHeight}
            noBorderTop={noBorderTop}
        >
            <ReactQuill
                ref={quillRef}
                key={field.name}
                preserveWhitespace
                theme="snow"
                modules={modules}
                formats={formats}
                value={field.value}
                defaultValue={field.value}
                onBlur={() => form.setFieldTouched(field.name, true)}
                onChange={(content, _, __, editor) => {
                    if (!editor.getText().trim() && !content.includes('class="ql-emojiblot"')) {
                        form.setFieldValue(field.name, '');
                    } else {
                        form.setFieldValue(field.name, content);
                    }
                }}
                {...props}
            />
            {label && (
                <InputLabel shrink className={clsx('label', !!error && touched && 'errorLabel')}>
                    {label}
                </InputLabel>
            )}
            {!!error && touched && (
                <FormHelperText variant="filled" error>
                    {error}
                </FormHelperText>
            )}
        </Root>
    );
};
