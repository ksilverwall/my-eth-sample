package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"
	"strings"
)

type ConfigClique struct {
	Period uint `json:"period"`
	Epoch  uint `json:"epoch"`
}

type ConfigEthash struct {
}

type Config struct {
	ChainId             uint          `json:"chainId"`
	HomesteadBlock      uint          `json:"homesteadBlock"`
	Eip150Block         uint          `json:"eip150Block"`
	Eip155Block         uint          `json:"eip155Block"`
	Eip158Block         uint          `json:"eip158Block"`
	ByzantiumBlock      uint          `json:"byzantiumBlock"`
	ConstantinopleBlock uint          `json:"constantinopleBlock"`
	PetersburgBlock     uint          `json:"petersburgBlock"`
	IstanbulBlock       uint          `json:"istanbulBlock"`
	BerlinBlock         uint          `json:"berlinBlock"`
	Clique              *ConfigClique `json:"clique"`
	Ethash              *ConfigEthash `json:"ethash"`
}

type Alloc struct {
	Balance string `json:"balance"`
}

type GenesisBlock struct {
	Config     Config           `json:"config"`
	Difficulty string           `json:"difficulty"`
	GasLimit   string           `json:"gasLimit"`
	Alloc      map[string]Alloc `json:"alloc"`
	Extradata  *string          `json:"extradata"`
}

func NewGenesisBlock(chainID uint, allocated []string, admin *string) *GenesisBlock {
	var exdata *string
	if admin != nil {
		v := "0x" + strings.Repeat("0", 32*2) + *admin + strings.Repeat("0", 65*2)
		exdata = &v
	}

	m := make(map[string]Alloc)

	for _, v := range allocated {
		m[v] = Alloc{Balance: "300000"}
	}

	return &GenesisBlock{
		Config: Config{
			ChainId: chainID,
			Clique: &ConfigClique{
				Period: 5,
				Epoch:  30000,
			},
		},
		Difficulty: "1",
		GasLimit:   "8000000",
		Alloc:      m,
		Extradata:  exdata,
	}
}

func main() {
	admin := flag.String("admin", "", "admin of PoA")
	addresses := flag.String("addresses", "", "Initial accounts")
	chainID := flag.Uint("chain-id", 1, "chain id")
	flag.Parse()

	if *admin == "" {
		fmt.Println("--admin is not set")
		os.Exit(1)
	}

	if strings.HasPrefix(*admin, "0x") {
		*admin = (*admin)[2:]
	}

	addrs := []string{}
	if *addresses != "" {
		addrs = strings.Split(*addresses, ",")
	}

	block := NewGenesisBlock(*chainID, append(addrs, *admin), admin)

	jsonBytes, err := json.MarshalIndent(block, "", "  ")
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	jsonString := string(jsonBytes)

	fmt.Println(jsonString)
}
