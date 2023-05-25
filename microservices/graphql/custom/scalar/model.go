package scalar

import (
	"fmt"
	"io"
	"strconv"

	"github.com/99designs/gqlgen/graphql"
)

func MarshalUInt64(u uint64) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		io.WriteString(w, strconv.FormatUint(u, 10))
	})

}
func UnmarshalUInt64(v interface{}) (uint64, error) {
	switch v := v.(type) {
	case uint64:
		return v, nil
	default:
		return 0, fmt.Errorf("%T is not an uint64", v)
	}
}
