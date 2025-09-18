import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1 '>{label} </label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="991q2g5j3hsslbj03l549okj6bjvrwv2h4ly82axm9s9ceqr"   // 🔑 use your key here
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap", "preview", 
                                "anchor", "searchreplace", "visualblocks", "code", "fullscreen", 
                                "insertdatetime", "media", "table", "help", "wordcount"
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={(newValue) => {
                            onChange(newValue);
                        }}
                    />
                )}
            />
        </div>
    )
}

