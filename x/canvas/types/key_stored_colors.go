package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// StoredColorsKeyPrefix is the prefix to retrieve all StoredColors
	StoredColorsKeyPrefix = "StoredColors/value/"
)

// StoredColorsKey returns the store key to retrieve a StoredColors from the index fields
func StoredColorsKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
