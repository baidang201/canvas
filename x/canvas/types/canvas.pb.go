// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: canvas/canvas/canvas.proto

package types

import (
	fmt "fmt"
	proto "github.com/gogo/protobuf/proto"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type Canvas struct {
	Width            uint64 `protobuf:"varint,1,opt,name=width,proto3" json:"width,omitempty"`
	Height           uint64 `protobuf:"varint,2,opt,name=height,proto3" json:"height,omitempty"`
	RefundDuration   string `protobuf:"bytes,3,opt,name=refundDuration,proto3" json:"refundDuration,omitempty"`
	AllowDenomPrefix string `protobuf:"bytes,4,opt,name=allowDenomPrefix,proto3" json:"allowDenomPrefix,omitempty"`
	PriceForPoint    uint64 `protobuf:"varint,5,opt,name=priceForPoint,proto3" json:"priceForPoint,omitempty"`
}

func (m *Canvas) Reset()         { *m = Canvas{} }
func (m *Canvas) String() string { return proto.CompactTextString(m) }
func (*Canvas) ProtoMessage()    {}
func (*Canvas) Descriptor() ([]byte, []int) {
	return fileDescriptor_1ca821a68983c4fa, []int{0}
}
func (m *Canvas) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Canvas) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Canvas.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Canvas) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Canvas.Merge(m, src)
}
func (m *Canvas) XXX_Size() int {
	return m.Size()
}
func (m *Canvas) XXX_DiscardUnknown() {
	xxx_messageInfo_Canvas.DiscardUnknown(m)
}

var xxx_messageInfo_Canvas proto.InternalMessageInfo

func (m *Canvas) GetWidth() uint64 {
	if m != nil {
		return m.Width
	}
	return 0
}

func (m *Canvas) GetHeight() uint64 {
	if m != nil {
		return m.Height
	}
	return 0
}

func (m *Canvas) GetRefundDuration() string {
	if m != nil {
		return m.RefundDuration
	}
	return ""
}

func (m *Canvas) GetAllowDenomPrefix() string {
	if m != nil {
		return m.AllowDenomPrefix
	}
	return ""
}

func (m *Canvas) GetPriceForPoint() uint64 {
	if m != nil {
		return m.PriceForPoint
	}
	return 0
}

func init() {
	proto.RegisterType((*Canvas)(nil), "canvas.canvas.Canvas")
}

func init() { proto.RegisterFile("canvas/canvas/canvas.proto", fileDescriptor_1ca821a68983c4fa) }

var fileDescriptor_1ca821a68983c4fa = []byte{
	// 209 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x92, 0x4a, 0x4e, 0xcc, 0x2b,
	0x4b, 0x2c, 0xd6, 0x47, 0xa1, 0xf4, 0x0a, 0x8a, 0xf2, 0x4b, 0xf2, 0x85, 0x78, 0xa1, 0x3c, 0x08,
	0xa5, 0xb4, 0x81, 0x91, 0x8b, 0xcd, 0x19, 0xcc, 0x14, 0x12, 0xe1, 0x62, 0x2d, 0xcf, 0x4c, 0x29,
	0xc9, 0x90, 0x60, 0x54, 0x60, 0xd4, 0x60, 0x09, 0x82, 0x70, 0x84, 0xc4, 0xb8, 0xd8, 0x32, 0x52,
	0x33, 0xd3, 0x33, 0x4a, 0x24, 0x98, 0xc0, 0xc2, 0x50, 0x9e, 0x90, 0x1a, 0x17, 0x5f, 0x51, 0x6a,
	0x5a, 0x69, 0x5e, 0x8a, 0x4b, 0x69, 0x51, 0x62, 0x49, 0x66, 0x7e, 0x9e, 0x04, 0xb3, 0x02, 0xa3,
	0x06, 0x67, 0x10, 0x9a, 0xa8, 0x90, 0x16, 0x97, 0x40, 0x62, 0x4e, 0x4e, 0x7e, 0xb9, 0x4b, 0x6a,
	0x5e, 0x7e, 0x6e, 0x40, 0x51, 0x6a, 0x5a, 0x66, 0x85, 0x04, 0x0b, 0x58, 0x25, 0x86, 0xb8, 0x90,
	0x0a, 0x17, 0x6f, 0x41, 0x51, 0x66, 0x72, 0xaa, 0x5b, 0x7e, 0x51, 0x40, 0x7e, 0x66, 0x5e, 0x89,
	0x04, 0x2b, 0xd8, 0x4a, 0x54, 0x41, 0x27, 0xfd, 0x13, 0x8f, 0xe4, 0x18, 0x2f, 0x3c, 0x92, 0x63,
	0x7c, 0xf0, 0x48, 0x8e, 0x71, 0xc2, 0x63, 0x39, 0x86, 0x0b, 0x8f, 0xe5, 0x18, 0x6e, 0x3c, 0x96,
	0x63, 0x88, 0x12, 0x85, 0x7a, 0xb8, 0x02, 0xe6, 0xf3, 0x92, 0xca, 0x82, 0xd4, 0xe2, 0x24, 0x36,
	0xb0, 0xcf, 0x8d, 0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0x95, 0x21, 0x7b, 0x09, 0x17, 0x01, 0x00,
	0x00,
}

func (m *Canvas) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Canvas) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Canvas) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.PriceForPoint != 0 {
		i = encodeVarintCanvas(dAtA, i, uint64(m.PriceForPoint))
		i--
		dAtA[i] = 0x28
	}
	if len(m.AllowDenomPrefix) > 0 {
		i -= len(m.AllowDenomPrefix)
		copy(dAtA[i:], m.AllowDenomPrefix)
		i = encodeVarintCanvas(dAtA, i, uint64(len(m.AllowDenomPrefix)))
		i--
		dAtA[i] = 0x22
	}
	if len(m.RefundDuration) > 0 {
		i -= len(m.RefundDuration)
		copy(dAtA[i:], m.RefundDuration)
		i = encodeVarintCanvas(dAtA, i, uint64(len(m.RefundDuration)))
		i--
		dAtA[i] = 0x1a
	}
	if m.Height != 0 {
		i = encodeVarintCanvas(dAtA, i, uint64(m.Height))
		i--
		dAtA[i] = 0x10
	}
	if m.Width != 0 {
		i = encodeVarintCanvas(dAtA, i, uint64(m.Width))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintCanvas(dAtA []byte, offset int, v uint64) int {
	offset -= sovCanvas(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Canvas) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Width != 0 {
		n += 1 + sovCanvas(uint64(m.Width))
	}
	if m.Height != 0 {
		n += 1 + sovCanvas(uint64(m.Height))
	}
	l = len(m.RefundDuration)
	if l > 0 {
		n += 1 + l + sovCanvas(uint64(l))
	}
	l = len(m.AllowDenomPrefix)
	if l > 0 {
		n += 1 + l + sovCanvas(uint64(l))
	}
	if m.PriceForPoint != 0 {
		n += 1 + sovCanvas(uint64(m.PriceForPoint))
	}
	return n
}

func sovCanvas(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozCanvas(x uint64) (n int) {
	return sovCanvas(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Canvas) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowCanvas
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: Canvas: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Canvas: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Width", wireType)
			}
			m.Width = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Width |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Height", wireType)
			}
			m.Height = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Height |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field RefundDuration", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthCanvas
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthCanvas
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.RefundDuration = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field AllowDenomPrefix", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthCanvas
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthCanvas
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.AllowDenomPrefix = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field PriceForPoint", wireType)
			}
			m.PriceForPoint = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.PriceForPoint |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		default:
			iNdEx = preIndex
			skippy, err := skipCanvas(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthCanvas
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipCanvas(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowCanvas
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowCanvas
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthCanvas
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupCanvas
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthCanvas
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthCanvas        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowCanvas          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupCanvas = fmt.Errorf("proto: unexpected end of group")
)