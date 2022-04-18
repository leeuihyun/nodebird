import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

// https://regexr.com/
// # = 문자 그대로
// g = 다수 개
// . = 한글자 (고정)
// ... 3글자 (고정)
// + = 그다음 모든 글자
// ex).+ .뒤에 모든 글자
// [] = 대괄호 안에 있는 것만 선택
// [^] = 대괄호 안에 ^ 을 붙인다면 이 안에 들어가있는 것들은 제외
// \s = 공백

const PostCardContent = ({ postData }) => (
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v) => {
            if (v.match(/(#[^\s#]+)/)) {
                return (
                    <Link
                        href={{
                            pathname: "/hashtag",
                            query: { tag: v.slice(1) },
                        }}
                        as={`/hashtag/${v.slice(1)}`}
                        key={v}
                    >
                        <a>{v}</a>
                    </Link>
                );
            }
            return v;
        })}
    </div>
);

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent;
